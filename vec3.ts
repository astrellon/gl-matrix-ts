import mat3 from "./mat3";
import mat4 from "./mat4";
import quat from "./quat";

export interface ReadonlyVec3
{
    readonly x: number;
    readonly y: number;
    readonly z: number;
}

export default class vec3 implements ReadonlyVec3
{
    public x: number;
    public y: number;
    public z: number;

    public constructor(x: number = 0, y: number = 0, z: number = 0)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Clones this vec3
     *
     * @returns a new 3D vector
     */
    public clone()
    {
        return new vec3(this.x, this.y, this.z);
    }

    /**
     * Calculates the length of this vec3
     */
    public length()
    {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    /**
     * Calculates the squared length of a vec3
     *
     * @returns squared length of a
     */
    public squaredLength()
    {
        return this.x ** 2 + this.y ** 2 + this.z ** 2;
    }

    /**
     * Copy the values from one vec3 to another
     * @param v the source vector
     * @returns out
     */
    public copy(v: ReadonlyVec3)
    {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    }

    /**
     * Set the components of a vec3 to the given values
     *
     * @param x X component
     * @param y Y component
     * @param z Z component
     * @returns out
     */
    public set(x: number, y: number, z: number)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    /**
     * Adds two vec3's
     * @param v the second operand
     */
    public add(v: ReadonlyVec3)
    {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    /**
     * Subtracts vector b from vector a
     * @param v the second operand
     */
    public subtract(v: ReadonlyVec3)
    {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    /**
     * Multiplies two vec3's
     * @param v the second operand
     */
    public multiply(v: ReadonlyVec3)
    {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    }

    /**
     * Divides two vec3's
     * @param v the second operand
     */
    public divide(v: ReadonlyVec3)
    {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    }

    /**
     * Scales a vec3 by a scalar number
     * @param v amount to scale the vector by
     */
    public scale(v: number)
    {
        this.x *= v;
        this.y *= v;
        this.z *= v;
        return this;
    }

    /**
     * Calculates the Euclidean distance between two vec3's
     * @param vector the second operand
     * @returns distance between a and b
     */
    public distance(vector: ReadonlyVec3)
    {
        const dx = vector.x - this.x;
        const dy = vector.y - this.y;
        const dz = vector.z - this.z;
        return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
    }

    /**
     * Calculates the squared euclidean distance between two vec3's
     * @param vector the second operand
     * @returns squared distance between a and b
     */
    public squaredDistance(vector: ReadonlyVec3)
    {
        const dx = vector.x - this.x;
        const dy = vector.y - this.y;
        const dz = vector.z - this.z;
        return dx ** 2 + dy ** 2 + dz ** 2;
    }

    /**
     * Negates the components of a vec3
     */
    public negate()
    {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }

    /**
     * Returns the inverse of the components of a vec3
     */
    public inverse()
    {
        this.x = 1.0 / this.x;
        this.y = 1.0 / this.y;
        this.z = 1.0 / this.z;
        return this;
    }

    /**
     * Normalize a vec3
     */
    public normalize()
    {
        let sqrtLen = this.squaredLength();
        if (sqrtLen > 0)
        {
            sqrtLen = 1.0 / Math.sqrt(sqrtLen);
        }

        this.x *= sqrtLen;
        this.y *= sqrtLen;
        this.z *= sqrtLen;
        return this;
    }

    /**
     * Calculates the dot product of two vec3's
     * @param vector the second operand
     * @returns dot product of a and b
     */
    public dot(vector: ReadonlyVec3)
    {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    /**
     * Computes the cross product of two vec3's
     * @param vector the second operand
     */
    public cross(vector: ReadonlyVec3)
    {
        return this.set(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.z
        );
    }

    /**
     * Performs a linear interpolation between two vec3's
     *
     * @param vector the second operand
     * @param t interpolation amount, in the range [0-1], between the two inputs
     */
    public lerp(vector: ReadonlyVec3, t: number)
    {
        return this.set(
            this.x + t * (vector.x - this.x),
            this.y + t * (vector.y - this.y),
            this.z + t * (vector.z - this.z)
        );
    }

    /**
     * Performs a spherical linear interpolation between two vec3's
     *
     * @param vector the second operand
     * @param t interpolation amount, in the range [0-1], between the two inputs
     */
    public slerp(vector: ReadonlyVec3, t: number)
    {
        const angle = Math.acos(Math.min(Math.max(this.dot(vector), -1), 1));
        const sinTotal = 1.0 / Math.sin(angle);

        const ratioA = Math.sin((1 - t) * angle) * sinTotal;
        const ratioB = Math.sin(t * angle) * sinTotal;

        return this.set(
            ratioA * this.x + ratioB * vector.x,
            ratioA * this.y + ratioB * vector.y,
            ratioA * this.z + ratioB * vector.z
        );
    }

    /**
     * Performs a hermite interpolation with two control points
     *
     * @param {vec3} v1 the first operand
     * @param {vec3} v2 the second operand
     * @param {vec3} v3 the third operand
     * @param {vec3} v4 the fourth operand
     * @param {number} t interpolation amount, in the range [0-1], between the two inputs
     * @returns {vec3} out
     */
    /*
    static hermite(v1: vec3, v2: vec3, v3: vec3, v4: vec3, t: number) {
        const { data: a } = v1;
        const { data: b } = v2;
        const { data: c } = v3;
        const { data: d } = v4;
        let factorTimes2 = t * t;
        let factor1 = factorTimes2 * (2 * t - 3) + 1;
        let factor2 = factorTimes2 * (t - 2) + t;
        let factor3 = factorTimes2 * (t - 1);
        let factor4 = factorTimes2 * (3 - 2 * t);
        return new vec3(
            a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4,
            a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4,
            a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4
        );
    }
        */

    /**
     * Performs a bezier interpolation with two control points
     *
     * @param {vec3} v1 the first operand
     * @param {vec3} v2 the second operand
     * @param {vec3} v3 the third operand
     * @param {vec3} v4 the fourth operand
     * @param {number} t interpolation amount, in the range [0-1], between the two inputs
     * @returns {vec3} out
     */
    /*
    static bezier(v1: vec3, v2: vec3, v3: vec3, v4: vec3, t: number) {
        const { data: a } = v1;
        const { data: b } = v2;
        const { data: c } = v3;
        const { data: d } = v4;
        let inverseFactor = 1 - t;
        let inverseFactorTimesTwo = inverseFactor * inverseFactor;
        let factorTimes2 = t * t;
        let factor1 = inverseFactorTimesTwo * inverseFactor;
        let factor2 = 3 * t * inverseFactorTimesTwo;
        let factor3 = 3 * factorTimes2 * inverseFactor;
        let factor4 = factorTimes2 * t;
        return new vec3(
            a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4,
            a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4,
            a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4
        );
    }
        */

    /**
     * Transforms the vec3 with a mat4.
     * 4th vector component is implicitly '1'
     * @param {mat4} matrix matrix to transform with
     * @returns {vec3} out
     */
    /*
    transformMat4(matrix: mat4) {
        const { data } = this;
        const m = matrix.data;
        let x = data[0],
            y = data[1],
            z = data[2];
        let w = m[3] * x + m[7] * y + m[11] * z + m[15];
        w = w || 1.0;
        return this.set(
            (m[0] * x + m[4] * y + m[8] * z + m[12]) / w,
            (m[1] * x + m[5] * y + m[9] * z + m[13]) / w,
            (m[2] * x + m[6] * y + m[10] * z + m[14]) / w
        );
    }
        */

    /**
     * Transforms the vec3 with a mat3.
     *
     * @param {mat3} matrix the 3x3 matrix to transform with
     * @returns {vec3} out
     */
    /*
    transformMat3(matrix: mat3) {
        const a = this.data;
        const m = matrix.data;
        let x = a[0],
            y = a[1],
            z = a[2];
        return this.set(
            x * m[0] + y * m[3] + z * m[6],
            x * m[1] + y * m[4] + z * m[7],
            x * m[2] + y * m[5] + z * m[8]
        );
    }
        */

    /**
     * Transforms the vec3 with a quat
     * Can also be used for dual quaternions. (Multiply it with the real part)
     * @param {ReadonlyQuat} rotation quaternion to transform with
     * @returns {vec3} out
     */
    /*
    transformQuat(rotation: quat) {
        const a = this.data;
        const q = rotation.data;
        // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
        let qx = q[0],
            qy = q[1],
            qz = q[2],
            qw = q[3];
        let x = a[0],
            y = a[1],
            z = a[2];
        // var qvec = [qx, qy, qz];
        // var uv = vec3.cross([], qvec, a);
        let uvx = qy * z - qz * y,
            uvy = qz * x - qx * z,
            uvz = qx * y - qy * x;
        // var uuv = vec3.cross([], qvec, uv);
        let uuvx = qy * uvz - qz * uvy,
            uuvy = qz * uvx - qx * uvz,
            uuvz = qx * uvy - qy * uvx;
        // vec3.scale(uv, uv, 2 * w);
        let w2 = qw * 2;
        uvx *= w2;
        uvy *= w2;
        uvz *= w2;
        // vec3.scale(uuv, uuv, 2);
        uuvx *= 2;
        uuvy *= 2;
        uuvz *= 2;
        // return vec3.add(out, a, vec3.add(out, uv, uuv));
        return this.set(x + uvx + uuvx, y + uvy + uuvy, z + uvz + uuvz);
    }
        */

    /**
     * Rotate a 3D vector around the x-axis
     * @param {vec3} origin The origin of the rotation
     * @param {number} rad The angle of rotation in radians
     * @returns {vec3} out
     */
    /*
    rotateX(origin: vec3, rad: number) {
        const { data } = this;
        const b = origin.data;
        let p = [],
            r = [];
        //Translate point to the origin
        p[0] = data[0] - b[0];
        p[1] = data[1] - b[1];
        p[2] = data[2] - b[2];

        //perform rotation
        r[0] = p[0];
        r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
        r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);

        //translate to correct position

        return this.set(r[0] + b[0], r[1] + b[1], r[2] + b[2]);
    }
        */

    /**
     * Rotate a 3D vector around the y-axis
     * @param {vec3} origin The origin of the rotation
     * @param {number} rad The angle of rotation in radians
     * @returns {vec3} out
     */
    /*
    rotateY(origin: vec3, rad: number) {
        const data = this.data;
        const b = origin.data;
        let p = [],
            r = [];
        //Translate point to the origin
        p[0] = data[0] - b[0];
        p[1] = data[1] - b[1];
        p[2] = data[2] - b[2];

        //perform rotation
        r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
        r[1] = p[1];
        r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);

        //translate to correct position

        return this.set(r[0] + b[0], r[1] + b[1], r[2] + b[2]);
    }
        */

    /**
     * Rotate a 3D vector around the z-axis
     * @param {vec3} origin The origin of the rotation
     * @param {number} rad The angle of rotation in radians
     * @returns {vec3} out
     */
    /*
    rotateZ(origin: vec3, rad: number) {
        const data = this.data;
        const b = origin.data;
        let p = [],
            r = [];
        //Translate point to the origin
        p[0] = data[0] - b[0];
        p[1] = data[1] - b[1];
        p[2] = data[2] - b[2];

        //perform rotation
        r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
        r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
        r[2] = p[2];

        //translate to correct position

        return this.set(r[0] + b[0], r[1] + b[1], r[2] + b[2]);
    }
        */

    /**
     * Get the angle between two 3D vectors
     * @param {vec3} vector The second operand
     * @returns {number} The angle in radians
     */
    /*
    angle(vector: vec3) {
        const data = this.data;
        const b = vector.data;
        let ax = data[0],
            ay = data[1],
            az = data[2],
            bx = b[0],
            by = b[1],
            bz = b[2],
            mag = Math.sqrt(
                (ax * ax + ay * ay + az * az) * (bx * bx + by * by + bz * bz)
            ),
            cosine = mag && this.dot(vector) / mag;
        return Math.acos(Math.min(Math.max(cosine, -1), 1));
    }
        */

    /**
     * Set the components of a vec3 to zero
     */
    public zero()
    {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        return this;
    }
}