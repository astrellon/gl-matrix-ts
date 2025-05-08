/**
 * Common utilities
 * @module glMatrix
 */
export default class mathf {
    // Configuration Constants
    static readonly EPSILON = 0.000001;
    static readonly ANGLE_ORDER = "zyx";
    static readonly DegToRad = Math.PI / 180;
    static readonly RadToDeg = 180 / Math.PI;

    /**
     * Convert Degree To Radian
     *
     * @param {number} a Angle in Degrees
     */
    static toRadian(a: number) {
        return a * this.DegToRad;
    }

    /**
     * Tests whether or not the arguments have approximately the same value, within an absolute
     * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
     * than or equal to 1.0, and a relative tolerance is used for larger values)
     *
     * @param {number} a The first number to test.
     * @param {number} b The second number to test.
     * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
     */
    equals(a: number, b: number) {
        return Math.abs(a - b) <= mathf.EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
    }

    /**
     * 限定在最小值和最大值之间
     * @param value
     * @param min
     * @param max
     * @returns
     */
    public static clamp(value: number, min: number, max: number) {
        return Math.max(Math.min(value, max), min);
    }

    /**
     * 插值
     * @param a
     * @param b
     * @param t
     * @returns
     */
    public static lerp(a: number, b: number, t: number) {
        return a + (b - a) * t;
    }

    /**
     * 当前值向target每次最多移动maxDelta距离
     * @param current
     * @param target
     * @param maxDelta
     * @returns
     */
    public static moveTowards(current: number, target: number, maxDelta: number) {
        const difference = target - current;
        if (Math.abs(difference) <= maxDelta) {
            return target;
        } else {
            return current + Math.sign(difference) * maxDelta;
        }
    }

    /**
     * 反插值
     * @param a
     * @param b
     * @param t
     * @returns
     */
    inverseLerp(a: number, b: number, t: number) {
        if (a === b) {
            return 0;
        } else {
            return (t - a) / (b - a);
        }
    }
}