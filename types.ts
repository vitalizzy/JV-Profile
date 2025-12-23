export type Language = 'en' | 'es';
export type ThemeMode = 'light' | 'dark' | 'system' | 'schedule';

export interface SocialLinks {
  linkedin: string;
  github: string;
  website: string;
  email: string;
}

export interface ShareMessages {
  whatsapp: string;
  twitter: string;
  emailSubject: string;
  emailBody: string;
}

export interface JobExperience {
  title: string;
  company: string;
  period: string;
  description: string;
  keyAchievementTitle: string;
  keyAchievementDesc: string;
}

export interface ProfileContent {
  role: string;
  bio: string;
  experienceTitle: string;
  experience: JobExperience;
  buttons: {
    primary: string;
    secondary: string;
  };
  socialLabels: {
    linkedin: string;
    github: string;
  };
  shareTitle: string;
  footerRights: string;
  shareMessages: ShareMessages;
}

export interface AppData {
  name: string;
  avatarUrl: string;
  socialUrls: SocialLinks;
  content: Record<Language, ProfileContent>;
}