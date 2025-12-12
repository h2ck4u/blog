import { Github, Instagram, Linkedin } from 'lucide-react';
import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { UserAvatar as ProfileImage } from '@/entities/user';
import { BLOG_CONFIG } from '@/blog.config';

const socialLinks = [
  {
    icon: Github,
    href: BLOG_CONFIG.social.github,
  },
  {
    icon: Instagram,
    href: BLOG_CONFIG.social.instagram,
  },
  {
    icon: Linkedin,
    href: BLOG_CONFIG.social.linkedIn,
  },
];
export default function ProfileSection() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-muted rounded-full p-2">
              <div className="h-36 w-36 overflow-hidden rounded-full">
                <ProfileImage />
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-bold">{BLOG_CONFIG.author.name}</h3>
            <p className="text-primary text-sm">{BLOG_CONFIG.author.role}</p>
          </div>

          <div className="flex justify-center gap-2">
            {socialLinks.map((item, index) => (
              <Button key={index} variant="ghost" className="bg-primary/10" size="icon" asChild>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <item.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>

          <p className="bg-primary/10 rounded p-2 text-center text-sm">Work Hard Play Hard ✨</p>
        </div>
      </CardContent>
    </Card>
  );
}
