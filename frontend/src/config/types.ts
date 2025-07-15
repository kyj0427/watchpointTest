import { StaticImageData } from "next/image";
import { ElementType, ReactNode } from "react";

export type Tid = string | number;

export type PageProps = {
    params: Promise<{
        id: string;
    }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export type NavLinkProps = {
    id: number;
    url: string;
    label: string;
};

export type headerBannerType = {
    title: string;
    bgImgClasses?: string | null;
    details?: string | null;
    description?: string | null;
    navLinks?: NavLinkProps[];
};

export type motionProps = {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    i?: number | string;
};

export type gaspProps = {
    as?: ElementType;
    children: React.ReactNode;
    className?: string;
    [x: string]: any;
}

export type customIconProps = {
    className?: string;
    width?: string;
    height?: string;
    size?: string;
    color?: string;
}

export type faqType = {
    id: Tid;
    question: string;
    answer: string;
};

export type counterElementType = {
    style: string;
    counterNumber: number;
    sizeText?: string;
};

export type ModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    children: ReactNode;
}

export type categoriesType = {
    id?: Tid;
    categoryName: string;
    image?: string;
    title?: string;
    details?: string;
}

export type tagType = {
    id?: Tid;
    name: string;
    url: string;
}

export type userType = {
    name: string;
    email?: string;
};

export type Tlibrary = {
    id: Tid;
    name: string;
    title: string;
    photo: StaticImageData;
    type: string;
    rating: number;
    publish: string;
    blockchain?: {
        name: string;
        icon: StaticImageData | string;
    };
    platform: string[];
    author: {
        name: string;
        role: string;
        avatar: StaticImageData;
    };
    images: StaticImageData[];
    genres: string[];
};

export type TPrize = {
    id: Tid;
    placement: number;
    currentPrize: number;
    potentialPrize: number;
    detailsLink: string;
};



export type blogType = {
    id: number;
    category: string;
    date: string;
    title: string;
    image: StaticImageData;
    shareCount: number;
    viewCount: number;
    description: string;
};

export type TProduct = {
    id: string;
    category: string;
    name: string;
    discountPrice?: number;
    price: number;
    image: StaticImageData | string;
    photos?: StaticImageData[] | string[];
    rating: number;
    tags: string[];
    productID?: string;
    description: string;
    reviews?: number;
};



