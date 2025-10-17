import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    ListRenderItemInfo,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import PostItem from '../components/PostItem';
import { Post } from '../types/post';
import { generatePosts } from '../data/mock';

const PAGE_SIZE = 20;

const FeedScreen: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(() => generatePosts(PAGE_SIZE));
    const [loadingMore, setLoadingMore] = useState(false);
    const loadingRef = useRef(false);

    const keyExtractor = useCallback((item: Post) => item.id, []);

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<Post>) => (
        <PostItem post={item} onToggleLike={handleToggleLike} />
    ),
    [posts]
    );

    const handleToggleLike = useCallback((id: string) => {
        setPosts(prev =>
        prev.map(p => (p.id === id ? { ...p, liked: !p.liked } : p))
        );
    }, []);

    const loadMore = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoadingMore(true);
    await new Promise(res => setTimeout(res, 800));

    setPosts(prev => [...prev, ...generatePosts(PAGE_SIZE)]);
    setLoadingMore(false);
    loadingRef.current = false;
    }, []);

    const getItemLayout = useCallback(
        (_: Post[] | null | undefined, index: number) => ({
        length: ITEM_APPROX_HEIGHT,
        offset: ITEM_APPROX_HEIGHT * index,
        index,
        }),
        []
    );

    const contentContainerStyle = useMemo(
        () => ({ paddingBottom: 24, backgroundColor: '#fff' }),
        []
    );

    return (
        <SafeAreaView style={styles.safe}>
        <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />
        <FlatList
            data={posts}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            onEndReachedThreshold={0.5}
            onEndReached={loadMore}
            ListFooterComponent={
            loadingMore ? (
                <View style={styles.footer}>
                <ActivityIndicator />
                </View>
            ) : null
            }
            initialNumToRender={10}
            maxToRenderPerBatch={8}
            windowSize={10}
            removeClippedSubviews
            updateCellsBatchingPeriod={50}
            getItemLayout={getItemLayout}
            contentContainerStyle={contentContainerStyle}
            showsVerticalScrollIndicator={false}
        />
        </SafeAreaView>
    );
};

const ITEM_APPROX_HEIGHT = 104;

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#fff' },
    footer: { paddingVertical: 16 },
});

export default FeedScreen;