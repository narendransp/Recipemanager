import React, { useEffect, useState } from "react";
import recipe from "../assets/recipe.jpg";

const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
  }, []);

  return (
    <div className="min-h-screen">
      <section
        className="relative flex flex-col justify-center items-center text-center text-white h-[75vh] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${recipe})`,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">👋 Welcome, {username}!</h1>
        <p className="text-lg md:text-xl max-w-2xl">
          Ready to cook something amazing today? Share your best recipes and inspire others 🍲
        </p>
      </section>
       <section className="bg-black shadow-md  p-6 ">
      <h2 className="text-3xl font-bold text-white mb-4"> Instructions</h2>
      <ul className="space-y-5 text-white">
        <li className="font-sans"><strong>Add a Recipe:</strong> Go to Public page, fill in details like title, ingredients, steps, and upload an image.</li>
        <li><strong>Keep it Private:</strong> Your recipe will only be visible to you if you don’t mark it as public.</li>
        <li><strong>Make it Public:</strong> Enable the “Public” option when adding your recipe so that all users can view it.</li>
        <li><strong>Edit/Delete:</strong> You can always update or remove your recipe from your <em>My Recipes</em> section.</li>
      </ul>
    </section>
    
    </div>
  );
};

export default Home;
