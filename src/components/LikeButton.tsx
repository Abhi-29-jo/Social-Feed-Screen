import React, { memo, useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

type Props = {
    liked: boolean;
    onToggle: () => void;
    size?: number;
};

const LikeButton: React.FC<Props> = ({ liked, onToggle, size = 24 }) => {
    const scale = useSharedValue(1);
    const color = liked ? '#e0245e' : '#999';

    const onPress = useCallback(() => {
    scale.value = 0.8;
    scale.value = withSpring(1, { damping: 8, stiffness: 200 });
    onToggle();
    }, [onToggle, scale]);

    const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: withTiming(1, { duration: 150 }),
    }));

    return (
    <Pressable onPress={onPress} hitSlop={10} style={styles.press}>
        <Animated.Text
        accessibilityRole="button"
        style={[styles.heart, { fontSize: size, color }, rStyle]}
        >
        ♥
        </Animated.Text>
    </Pressable>
    );
};

const styles = StyleSheet.create({
    press: { padding: 4 },
    heart: { fontWeight: '700' },
});

export default memo(LikeButton);