import Link from "next/link";

const Home = () => {
  return <div className="w-full max-w-2xl flex flex-col items-center justify-center gap-4">
    <p className="mt-4 text-4xl font-bold">Talent Match AI</p>
    <p className="text-2xl text-gray-500">
      This is a demo for the final project of CS 6120 - Natural Language Processing.
      <br />
      The backend is built with <Link href="https://www.python.org/" className="text-blue-500" target="_blank">Python</Link>, <Link href="https://fastapi.tiangolo.com/" className="text-blue-500" target="_blank">FastAPI</Link> and <Link href="https://www.postgresql.org/" className="text-blue-500" target="_blank">PostgreSQL</Link> with <Link href="https://github.com/pgvector/pgvector" className="text-blue-500" target="_blank">pgvector extension</Link>. It vectorizes the more than 2000 resumes and stores them in the database, including various skills, education background, and experiences so that HRs can search for the most relevant candidates with natural language queries.
      <br />
      The frontend is built with <Link href="https://nextjs.org/" className="text-blue-500" target="_blank">Next.js</Link> and <Link href="https://tailwindcss.com/" className="text-blue-500" target="_blank">Tailwind CSS</Link>.
      <br />
      Please feel free to try it out in the <Link href="/search" className="text-blue-500">search page</Link>.
    </p>
    <Link href="https://github.com/6120-Talent-Match" className="text-blue-500" target="_blank">GitHub</Link>
  </div >;
};

export default Home;
