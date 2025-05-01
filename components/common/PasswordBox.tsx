import { useState } from "react";

interface PasswordBoxProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

export const PasswordBox = ({onChange,value}:PasswordBoxProps) => {
    const [isPasswordVisible, setIsPasswordVisiblity] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisiblity((prevState: boolean) => !prevState);
    };

    return(
        <div className="mt-4">
            <label className="text-sm font-medium text-gray-700 ml-2">Password</label>
            <div className="relative w-full max-w-sm">
            <input
                id="toggle-password"
                value={value}
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5"
                placeholder="Enter password"
                onChange={onChange}
                autoComplete="new-password"
            />
            </div>
            <div>
            <input
            type="checkbox"
            checked={isPasswordVisible}
            onChange={togglePasswordVisibility}
            className="mt-4 ml-4"
            />
            <label className="text-sm font-medium text-gray-700 ml-2">Show Password</label>
            </div>
        </div>
    )
}


