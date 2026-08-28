/** @format */

type Carrers = 'Web Development' | 'Mobile Development' | 'UI/UX' | 'Data Science' | 'Business' | 'Other';

export interface IBootCamp {
  user?: string;
  name: string;
  description: string;
  website?: string;
  phone?: string;
  email: string;
  photo?: string;
  address?: string;
  location?: {
    type: string;
    coordinates: number[];
    formattedAddress?: string;
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
  };
  slug?: string;
  careers: Carrers[];
  averageRating?: number;
  averageCost?: number;
  housing?: boolean;
  jobAssistance?: boolean;
  jobGuarantee?: boolean;
  acceptGi?: boolean;
}
