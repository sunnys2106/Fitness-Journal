import { ReactNode } from "react";

type RectangleProps = {
    children: ReactNode;
};

function Rectangle({ children }: RectangleProps): JSX.Element {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-2/3 max-w-4xl min-h-[80vh] bg-white rounded-2xl shadow-lg p-8">
                {children}
            </div>
        </div>
    );
}
export default Rectangle;
