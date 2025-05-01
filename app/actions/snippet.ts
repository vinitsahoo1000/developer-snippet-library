    "use server";

    import prisma from "@/db/index";
    import { revalidatePath } from "next/cache";
    import { z } from "zod";
    import { getUserFromToken } from "@/lib/auth";
    import { Language } from "@prisma/client";
    import { User } from "./user";


    const SnippetSchema = z.object({
        title: z.string().min(1),
        code: z.string().min(1),
        language: z.nativeEnum(Language),
    });

    export interface Snippet {
        id: string;             // Unique identifier for the snippet
        title: string;          // Title of the snippet
        code: string;           // The code snippet itself (could be multiline string)
        language: 'JavaScript' | 'TypeScript' | 'Python' | 'Java' | 'CSharp' | 'Ruby' | 'HTML' | 'CSS' | 'Go' | 'PHP';  // Language of the snippet
        userId: string;         // User ID who created the snippet          
        createdAt: Date;        // Timestamp when the snippet was created
        updatedAt: Date;        // Timestamp when the snippet was last updated
    }


    export async function createSnippet(formData: FormData) {
        const userId = await getUserFromToken();

        const data = {
            title: formData.get("title"),
            code: formData.get("code"),
            language: formData.get("language"),
        };

        const parsed = SnippetSchema.safeParse(data);
        if (!parsed.success) throw new Error("Invalid snippet data");

        const snippet = await prisma.snippet.create({
            data: {
            ...parsed.data,
            userId,
            },
        });

        revalidatePath("/snippets");
        return snippet;
    }

    export async function editSnippet(id: string, formData: FormData) {
        const userId = await getUserFromToken();

        const data = {
            title: formData.get("title"),
            code: formData.get("code"),
            language: formData.get("language"),
        };

        const parsed = SnippetSchema.safeParse(data);
        if (!parsed.success) throw new Error("Invalid snippet data");

        // Optional: ensure snippet belongs to user
        const existing = await prisma.snippet.findUnique({ where: { id } });
        if (existing?.userId !== userId) throw new Error("Unauthorized");

        const snippet = await prisma.snippet.update({
            where: { id },
            data: parsed.data,
        });

        revalidatePath("/snippets");
        return snippet;
    }

    export async function deleteSnippet(id: string) {
        const userId = await getUserFromToken();

        const snippet = await prisma.snippet.findUnique({ where: { id } });
        if (!snippet || snippet.userId !== userId) throw new Error("Unauthorized");

        await prisma.snippet.delete({ where: { id } });

        revalidatePath("/snippets");
        return { message: "Snippet deleted" };
    }

    export async function getSnippet(id: string) {
        const userId = await getUserFromToken();

        const snippet = await prisma.snippet.findUnique({
            where: { id },
            include: {user: true},
            
        });

        if (!snippet || snippet.userId !== userId) throw new Error("Unauthorized");

        return { snippet };
    }


export async function getSnippets() {
        const userId = await getUserFromToken();
    
        const snippets = await prisma.snippet.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    
        return { snippets };
}
    