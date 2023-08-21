import { TodoItem } from '@/components/TodoItem';
import { prisma } from '@/db';
import Link from 'next/link';

const getTodos = async () => prisma.todo.findMany();

async function handleToggleTodo(id: string, complete: boolean) {
  'use server';

  await prisma.todo.update({ where: { id }, data: { complete } });
}

const Home = async () => {
  const todos = await getTodos();

  return (
    <>
      <header className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl'>Todos</h1>
        <Link
          href='/new'
          className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:gb-slate-700 outline-none'>
          New
        </Link>
      </header>
      <ul className='pl-4'>
        {todos.map(todo => (
          <TodoItem key={todo.id} toggleTodo={handleToggleTodo} {...todo} />
        ))}
      </ul>
    </>
  );
};

export default Home;
