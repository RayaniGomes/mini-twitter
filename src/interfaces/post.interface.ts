export interface Post {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  authorName: string;
  authorId: number;
  createdAt?: Date;
  likesCount: number;
}

export interface PostsPage {
  posts: Post[];
  nextPage: number | undefined;
}

export interface PostStore {
    posts: Post [];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    getPosts: (id: string) => void;
    createPost: (post: Post) => void;
    deletePost: (id: string) => void;
    updatePost: (id: string, post: Post) => void;
}

export interface EditPostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}