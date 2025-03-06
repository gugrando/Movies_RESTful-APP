import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="bg-gray-600 text-white p-4">Navbar</header> */}
      <main className="flex-grow h-fit">
        <Outlet />
      </main>
      {/* <footer className="bg-gray-600 text-white p-4 text-center">Footer</footer> */}
    </div>
  );
}