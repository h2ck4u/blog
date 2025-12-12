import { getPublishedPosts } from '@/shared/lib/notion';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const tag = searchParams?.get('tag') || undefined;
  const sort = searchParams?.get('sort') || undefined;
  const startCursor = searchParams?.get('startCursor') || undefined;
  const pageSize = Number(searchParams?.get('pageSize')) || undefined;
  const isThoughtParam = searchParams?.get('isThought');
  const isThought =
    isThoughtParam === 'true' ? true : isThoughtParam === 'false' ? false : undefined;

  const response = await getPublishedPosts({ tag, sort, startCursor, pageSize, isThought });

  return NextResponse.json(response);
}
