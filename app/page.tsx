import CodeEditor from './components/CodeEditor';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <CodeEditor />
      </div>
      <footer className="bg-gray-800 text-white py-4 w-full flex justify-center items-center">
        <p className="text-sm text-white/70">&copy; {new Date().getFullYear()} Mohamed Amine Welfeki. All rights reserved.</p>
      </footer>
    </main>
  );
}
