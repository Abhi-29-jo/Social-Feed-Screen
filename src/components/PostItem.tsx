import React, { memo, useCallback } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
    FadeInDown,
    Layout,
} from 'react-native-reanimated';
import { Post } from '../types/post';
import LikeButton from './LikeButton';

type Props = {
    post: Post;
    onToggleLike: (id: string) => void;
};

const AVATAR_SIZE = 44;

const PostItem: React.FC<Props> = ({ post, onToggleLike }) => {
    const handleToggle = useCallback(() => onToggleLike(post.id), [post.id, onToggleLike]);

    return (
        <Animated.View
        entering={FadeInDown.duration(300)}
        layout={Layout.springify().damping(15)}
        style={styles.container}
        >
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>{post.name}</Text>
        <Text style={styles.text}>{post.text}</Text>
            <View style={styles.row}>
            <LikeButton liked={post.liked} onToggle={handleToggle} />
            <Text style={[styles.likeLabel, { color: post.liked ? '#e0245e' : '#999' }]}>
                {post.liked ? 'Liked' : 'Like'}
            </Text>
            </View>
        </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#eee',
    },
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        marginRight: 12,
        backgroundColor: '#f0f0f0',
    },
    body: { flex: 1 },
    name: { fontWeight: '700', fontSize: 15, marginBottom: 4, color: '#111' },
    text: { fontSize: 14, color: '#333' },
    row: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    likeLabel: { marginLeft: 4, fontSize: 14 },
    });

export default memo(PostItem);