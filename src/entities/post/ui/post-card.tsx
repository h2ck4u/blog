'use client';

import { Card, CardContent } from '@/shared/ui/card';
import { User } from 'lucide-react';
import Image from 'next/image';
import { Post } from '../model/types';
import { formatDate } from '@/shared/lib/date';

interface PostCardProps {
  post: Post;
  isFirst?: boolean;
}

export function PostCard({ post, isFirst = false }: PostCardProps) {
  return (
    <Card className="group gap-0 overflow-hidden p-0">
      {post.coverImage && (
        <div className="relative aspect-[2/1] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={isFirst}
            className="object-cover"
          />
        </div>
      )}
      <CardContent className="p-4">
        <div className="mt-1 flex items-center gap-x-4 text-xs">
          {post.author && (
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          )}
          {post.date && (
            <div className="text-muted-foreground mb-1 flex items-center gap-1.5">
              <time>{formatDate(post.date)}</time>
            </div>
          )}
        </div>
        <h2 className="group-hover:text-muted-foreground mb-2 text-xl tracking-tight transition-colors">
          {post.title}
        </h2>
        {post.description && (
          <p className="text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
            {post.description}
          </p>
        )}
        {/* <div className="mb-1 flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary font-medium">
              {tag}
            </Badge>
          ))}
        </div> */}
      </CardContent>
    </Card>
  );
}
