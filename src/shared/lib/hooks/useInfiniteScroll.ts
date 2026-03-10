import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
    loading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
    threshold?: number;
}

export function useInfiniteScroll({
                                      loading,
                                      hasMore,
                                      onLoadMore,
                                      threshold = 100,
                                  }: UseInfiniteScrollProps) {
    const observer = useRef<IntersectionObserver | null>(null);
    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (loading || !hasMore) return;

        const options = {
            root: null,
            rootMargin: `0px 0px ${threshold}px 0px`,
            threshold: 0.1,
        };

        observer.current = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting && !loading && hasMore) {
                onLoadMore();
            }
        }, options);

        if (loaderRef.current) {
            observer.current.observe(loaderRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [loading, hasMore, onLoadMore, threshold]);

    return loaderRef;
}
