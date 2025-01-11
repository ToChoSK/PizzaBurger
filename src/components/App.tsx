import React from 'react';

interface PizzaBurgerProps {
    name: string;
}

const PizzaBurger: React.FC<PizzaBurgerProps> = ({ name }) => {
    return <div>{name}</div>;
};

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-blue-600">
                    Welcome to PizzaBurger
                </h1>
                <p className="text-gray-600">
                    This is a TypeScript React application with Tailwind CSS.
                </p>
                <PizzaBurger name="Margherita Burger" />
            </div>
        </div>
    );
};

export default App;

