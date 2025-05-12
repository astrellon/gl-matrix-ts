import { rmat3 } from "./mat3";
import { rmat4 } from "./mat4";
import { rquat } from "./quat";

export interface vec3
{
    x: number;
    y: number;
    z: number;
}

export type rvec3 = Readonly<vec3>;

/**
 * Clones this vector
 *
 * @param v the vector to clone
 * @returns a new vector
 */
export function vec3Clone(v: rvec3): vec3
{
    return {x: v.x, y: v.y, z: v.z};
}

/**
 * Copy the values from one vec3 to another
 * @param v the target vector
 * @param a the copy vector
 * @returns the target vector
 */
export function vec3Copy(v: vec3, a: rvec3)
{
    v.x = a.x;
    v.y = a.y;
    v.z = a.z;
    return v;
}

/**
 * Set the components of a vec3 to the given values
 *
 * @param v the target vector
 * @param x X component
 * @param y Y component
 * @param z Z component
 * @returns the target vector
 */
export function vec3Set(v: vec3, x: number, y: number, z: number)
{
    v.x = x;
    v.y = y;
    v.z = z;
    return v;
}

/**
 * Calculates the length vector v
 *
 * @params the source vector
 * @returns length of v
 */
export function vec3Length(v: rvec3)
{
    return Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
}

/**
 * Calculates the squared length of a vec3
 *
 * @returns squared length of v
 */
export function vec3SquaredLength(v: rvec3)
{
    return v.x ** 2 + v.y ** 2 + v.z ** 2;
}

/**
 * Adds vector other into vec
 *
 * @param v the target vector
 * @param left the left vector
 * @param right the right vector
 * @returns the target vector
 */
export function vec3AddTo(v: vec3, left: vec3 | rvec3, right: rvec3)
{
    v.x = left.x + right.x;
    v.y = left.y + right.y;
    v.z = left.z + right.z;
    return v;
}

/**
 * Adds two vectors into a new vector
 *
 * @param left the left vector
 * @param right the right vector
 * @returns a new vector
 */
export function vec3Add(left: rvec3, right: rvec3): vec3
{
    return {
        x: left.x + right.x,
        y: left.y + right.y,
        z: left.z + right.z,
    }
}

/**
 * Subtracts vector other from vector vec

 * @param v the target vector
 * @param left the left vector
 * @param right the right vector
 * @returns the target vector
 */
export function vec3SubFrom(v: vec3, left: vec3 | rvec3, right: rvec3)
{
    v.x = left.x - right.x;
    v.y = left.y - right.y;
    v.z = left.z - right.z;
    return v;
}

/**
 * Subtracts vector other from vector vec into a new vector
 * @param left the left vector
 * @param right the right vector
 * @returns a new vector
 */
export function vec3Sub(left: rvec3, right: rvec3): vec3
{
    return {
        x: left.x - right.x,
        y: left.y - right.y,
        z: left.z - right.z,
    }
}

/**
 * Multiplies the left vector by the right vector
 *
 * @param v the target vector
 * @param left the left vector
 * @param right the right vector
 * @returns the target vector
 */
export function vec3MulTo(v: vec3, left: vec3 | rvec3, right: rvec3)
{
    v.x = left.x * right.x;
    v.y = left.y * right.y;
    v.z = left.z * right.z;
    return v;
}

/**
 * Multiplies the left vector by the right vector into a new vector
 * @param left the left vector
 * @param right the right vector
 * @returns a new vector
 */
export function vec3Mul(left: rvec3, right: rvec3): vec3
{
    return {
        x: left.x * right.x,
        y: left.y * right.y,
        z: left.z * right.z,
    }
}

/**
 * Divides the left vector by the right vector
 *
 * @param v the target vector
 * @param left the left vector
 * @param right the right vector
 * @returns the target vector
 */
export function vec3DivBy(v: vec3, left: vec3 | rvec3, right: rvec3)
{
    v.x = left.x / right.x;
    v.y = left.y / right.y;
    v.z = left.z / right.z;
    return v;
}

/**
 * Divides the left vector by the right vector into a new vector
 * @param left the left vector
 * @param right the right vector
 * @returns a new vector
 */
export function vec3Div(left: rvec3, right: rvec3): vec3
{
    return {
        x: left.x / right.x,
        y: left.y / right.y,
        z: left.z / right.z,
    }
}

/**
 * Scales the target vector by a scalar number
 * @param v the target vector
 * @param left the left vector
 * @param right amount to scale the vector by
 * @returns the target vector
 */
export function vec3ScaleBy(v: vec3, left: vec3 | rvec3, right: number)
{
    v.x = left.x * right;
    v.y = left.y * right;
    v.z = left.z * right;
    return v;
}

/**
 * Scales the target vector by a scalar number into a new vector
 * @param v the target vector
 * @param scale amount to scale the vector by
 * @returns a new vector
 */
export function vec3Scale(v: rvec3, scale: number): vec3
{
    return {
        x: v.x * scale,
        y: v.y * scale,
        z: v.z * scale
    };
}

/**
 * Scales the target vector by a scalar number into a new vector
 * @param v the target vector
 * @param scale amount to scale the vector by
 * @returns a new vector
 */
export function vec3ScaleAndAddBy(target: vec3, left: rvec3, right: rvec3, scale: number): vec3
{
    target.x = left.x + (right.x * scale);
    target.y = left.y + (right.y * scale);
    target.z = left.z + (right.z * scale);
    return target;
}

/**
 * Calculates the Euclidean distance between two vectors
 * @param left the left operand
 * @param right the right operand
 * @returns the distance between left and right
 */
export function vec3Distance(left: rvec3, right: rvec3)
{
    const dx = left.x - right.x;
    const dy = left.y - right.y;
    const dz = left.z - right.z;
    return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
}

/**
 * Calculates the squared euclidean distance between two vectors
 * @param left the left operand
 * @param right the right operand
 * @returns the square distance between left and right
 */
export function vec3SquaredDistance(left: rvec3, right: rvec3)
{
    const dx = left.x - right.x;
    const dy = left.y - right.y;
    const dz = left.z - right.z;
    return dx ** 2 + dy ** 2 + dz ** 2;
}

/**
 * Negates the components of vector v
 * @param v the target vector
 * @returns the target vector
 */
export function vec3Negate(v: vec3)
{
    v.x = -v.x;
    v.y = -v.y;
    v.z = -v.z;
    return v;
}

/**
 * Negates the components of vector v into a new vector
 * @param v the target vector
 * @returns a new vector
 */
export function vec3Negated(v: rvec3): vec3
{
    return {
        x: -v.x,
        y: -v.y,
        z: -v.z
    }
}

/**
 * Inverse of the components of a vector
 *
 * @param v the target vector
 * @param source the source vector
 * @returns the target vector
 */
export function vec3Inverse(v: vec3, source: vec3 | rvec3)
{
    v.x = 1.0 / source.x;
    v.y = 1.0 / source.y;
    v.z = 1.0 / source.z;
    return v;
}

/**
 * Returns the inverse of the components of a vector into a new vector
 *
 * @param v the target vector
 * @returns a new vector
 */
export function vec3Inversed(v: rvec3): vec3
{
    return {
        x: 1.0 / v.x,
        y: 1.0 / v.y,
        z: 1.0 / v.z
    };
}

/**
 * Normalize the given vector v
 * @param v the target vector
 * @returns the target vector
 */
export function vec3Normalize(v: vec3, source: vec3 | rvec3)
{
    let sqrtLen = vec3SquaredLength(source);
    if (sqrtLen > 0)
    {
        sqrtLen = 1.0 / Math.sqrt(sqrtLen);
    }

    v.x = source.x * sqrtLen;
    v.y = source.y * sqrtLen;
    v.z = source.z * sqrtLen;
    return v;
}

/**
 * Normalize the given vector v into a new vector
 * @param v the target vector
 * @returns a new vector
 */
export function vec3Normalized(v: rvec3): vec3
{
    let sqrtLen = vec3SquaredLength(v);
    if (sqrtLen > 0)
    {
        sqrtLen = 1.0 / Math.sqrt(sqrtLen);
    }

    return {
        x: v.x * sqrtLen,
        y: v.y * sqrtLen,
        z: v.z * sqrtLen
    }
}

/**
 * Normalize the given vector v into a new vector
 * @param v the target vector
 * @returns a new vector
 */
export function vec3NormalizedValues(x: number, y: number, z: number): vec3
{
    let sqrtLen = x ** 2 + y ** 2 + z ** 2;
    if (sqrtLen > 0)
    {
        sqrtLen = 1.0 / Math.sqrt(sqrtLen);
    }

    return {
        x: x * sqrtLen,
        y: y * sqrtLen,
        z: z * sqrtLen
    }
}

/**
 * Calculates the dot product of two vec3's
 * @param left the left vector
 * @param right the right vector
 * @returns dot product of left and right
 */
export function vec3Dot(left: rvec3, right: rvec3)
{
    return left.x * right.x + left.y * right.y + left.z * right.z;
}

/**
 * Computes the cross product of two vectors into the target vector
 *
 * @param v the  target vector
 * @param left the left vector
 * @param right the right vector
 * @returns the target vector
 */
export function vec3CrossBy(v: vec3, left: vec3 | rvec3, right: rvec3)
{
    const x = left.y * right.z - left.z * right.y;
    const y = left.z * right.x - left.x * right.z;
    const z = left.x * right.y - left.y * right.x;

    v.x = x;
    v.y = y;
    v.z = z;
    return v;
}

/**
 * Computes the cross product of two vectors into a new vector
 * @param left the left vector
 * @param right the right vector
 * @returns a new vector
 */
export function vec3Cross(left: rvec3, right: rvec3): vec3
{
    return {
        x: left.y * right.z - left.z * right.y,
        y: left.z * right.x - left.x * right.z,
        z: left.x * right.y - left.y * right.x
    };
}

/**
 * Performs a linear interpolation between two vectors into a new vector
 *
 * @param left the left vector
 * @param right the right vector
 * @param t interpolation amount, in the range [0-1], between the two inputs (not clamped)
 * @returns a new vector
 */
export function vec3Lerp(left: rvec3, right: rvec3, t: number): vec3
{
    return {
        x: left.x + t * (right.x - left.x),
        y: left.y + t * (right.y - left.y),
        z: left.z + t * (right.z - left.z)
    };
}

/**
 * Performs a spherical linear interpolation between two vectors
 *
 * @param v the target vector
 * @param left the left vector
 * @param right the right vector
 * @param t interpolation amount, in the range [0-1], between the two inputs
 * @returns the target vector
 */
export function vec3SlerpBy(v: vec3, left: vec3 | rvec3, right: rvec3, t: number)
{
    const angle = Math.acos(Math.min(Math.max(vec3Dot(left, right), -1), 1));
    const sinTotal = 1.0 / Math.sin(angle);

    const ratioA = Math.sin((1 - t) * angle) * sinTotal;
    const ratioB = Math.sin(t * angle) * sinTotal;

    const x = ratioA * left.x + ratioB * right.x;
    const y = ratioA * left.y + ratioB * right.y;
    const z = ratioA * left.z + ratioB * right.z;

    v.x = x;
    v.y = y;
    v.z = z;
    return v;
}

/**
 * Performs a spherical linear interpolation between two vectors into a new vector
 *
 * @param left the left vector
 * @param right the right vector
 * @param t interpolation amount, in the range [0-1], between the two inputs
 * @returns a new vector
 */
export function vec3Slerp(left: rvec3, right: rvec3, t: number): vec3
{
    const angle = Math.acos(Math.min(Math.max(vec3Dot(left, right), -1), 1));
    const sinTotal = 1.0 / Math.sin(angle);

    const ratioA = Math.sin((1 - t) * angle) * sinTotal;
    const ratioB = Math.sin(t * angle) * sinTotal;

    return {
        x: ratioA * left.x + ratioB * right.x,
        y: ratioA * left.y + ratioB * right.y,
        z: ratioA * left.z + ratioB * right.z
    };
}

/**
 * Performs a hermite interpolation with two control points
 *
 * @param v the target vector
 * @param v1 the first operand
 * @param v2 the second operand
 * @param v3 the third operand
 * @param v4 the fourth operand
 * @param t interpolation amount, in the range [0-1], between the two inputs
 * @returns the target vector
 */
export function vec3Hermite(v: vec3, v1: rvec3, v2: rvec3, v3: rvec3, v4: rvec3, t: number)
{
    const factorTimes2 = t * t;
    const factor1 = factorTimes2 * (2 * t - 3) + 1;
    const factor2 = factorTimes2 * (t - 2) + t;
    const factor3 = factorTimes2 * (t - 1);
    const factor4 = factorTimes2 * (3 - 2 * t);

    v.x = v1.x * factor1 + v2.x * factor2 + v3.x * factor3 + v4.x * factor4;
    v.y = v1.y * factor1 + v2.y * factor2 + v3.y * factor3 + v4.y * factor4;
    v.z = v1.z * factor1 + v2.z * factor2 + v3.z * factor3 + v4.z * factor4;
    return v;
}

/**
 * Performs a bezier interpolation with two control points
 *
 * @param v the target vector
 * @param v1 the first operand
 * @param v2 the second operand
 * @param v3 the third operand
 * @param v4 the fourth operand
 * @param t interpolation amount, in the range [0-1], between the two inputs
 * @returns the target vector
 */
export function vec3Bezier(v: vec3, v1: rvec3, v2: rvec3, v3: rvec3, v4: rvec3, t: number)
{
    const inverseFactor = 1 - t;
    const inverseFactorTimesTwo = inverseFactor * inverseFactor;
    const factorTimes2 = t * t;
    const factor1 = inverseFactorTimesTwo * inverseFactor;
    const factor2 = 3 * t * inverseFactorTimesTwo;
    const factor3 = 3 * factorTimes2 * inverseFactor;
    const factor4 = factorTimes2 * t;

    v.x = v1.x * factor1 + v2.x * factor2 + v3.x * factor3 + v4.x * factor4;
    v.y = v1.y * factor1 + v2.y * factor2 + v3.y * factor3 + v4.y * factor4;
    v.z = v1.z * factor1 + v2.z * factor2 + v3.z * factor3 + v4.z * factor4;
    return v;
}

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param out the target vector
 * @param m the matrix to transform with
 * @returns the target matrix
 */
export function vec3TransformMat4(out: vec3, v: vec3 | rvec3, m: rmat4)
{
    const vx = v.x,
        vy = v.y,
        vz = v.z;

    let w = m.m03 * vx + m.m13 * vy + m.m23 * vz + m.m33;
    if (w != 0)
    {
        w = 1.0 / w;
    }
    else
    {
        w = 1.0;
    }

    out.x = (m.m00 * vx + m.m10 * vy + m.m20 * vz + m.m30) / w;
    out.y = (m.m01 * vx + m.m11 * vy + m.m21 * vz + m.m31) / w;
    out.z = (m.m02 * vx + m.m12 * vy + m.m22 * vz + m.m32) / w;
    return out;
}

/**
 * Transforms the vec3 with a mat3.
 *
 * @param v the target vector
 * @param m the 3x3 matrix to transform with
 * @returns the target vector
 */
export function vec3TransformMat3(out: vec3, v: vec3 | rvec3, m: rmat3)
{
    const vx = v.x,
        vy = v.y,
        vz = v.z;

    out.x = vx * m.m00 + vy * m.m10 + vz * m.m20,
    out.y = vx * m.m01 + vy * m.m11 + vz * m.m21,
    out.z = vx * m.m02 + vy * m.m12 + vz * m.m22
    return out;
}

/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param out the target vector
 * @param v the vector transform
 * @param q quaternion to transform with
 * @returns the target vector
 */
export function vec3TransformQuat(out: vec3, v: vec3 | rvec3, q: rquat)
{
    // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
    const x = v.x,
        y = v.y,
        z = v.z;

    const w2 = q.w * 2;
    const uvx = (q.y * z - q.z * y) * w2,
        uvy = (q.z * x - q.x * z) * w2,
        uvz = (q.x * y - q.y * x) * w2;

    const uuvx = (q.y * uvz - q.z * uvy) * 2,
        uuvy = (q.z * uvx - q.x * uvz) * 2,
        uuvz = (q.x * uvy - q.y * uvx) * 2;

    // return vec3.add(out, a, vec3.add(out, uv, uuv));
    out.x = x + uvx + uuvx;
    out.y = y + uvy + uuvy;
    out.z = z + uvz + uuvz;
    return out;
}

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} origin The origin of the rotation
 * @param {number} rad The angle of rotation in radians
 * @returns {vec3} out
 */
/*
export function vec3RotateX(out: vec3, v: vec3 | rvec3, origin: rvec3, rad: number)
{
    //Translate point to the origin
    const px = v.x - origin.x,
        py = v.y - origin.y,
        pz = v.z - origin.z;

    const srad = Math.sin(rad),
        crad = Math.cos(rad);

    //perform rotation
    //rx = px;
    const ry = py * crad - pz * srad,
        rz = py * srad + pz * crad;

    //translate to correct position
    out.x = px + origin.x;
    out.y = ry + origin.y;
    out.z = rz + origin.z;
    return out;
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
        let p = ,
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
 * Creates a zero vector
 */
export function vec3Zero(): vec3
{
    return {x: 0, y: 0, z: 0}
}

export function vec3Abs(v: rvec3): vec3
{
    return {
        x: Math.abs(v.x),
        y: Math.abs(v.y),
        z: Math.abs(v.z),
    }
}

export function vec3Max(v: rvec3, s: number): vec3
{
    return {
        x: Math.max(v.x, s),
        y: Math.max(v.y, s),
        z: Math.max(v.z, s),
    }
}

export function vec3Min(v: rvec3, s: number): vec3
{
    return {
        x: Math.min(v.x, s),
        y: Math.min(v.y, s),
        z: Math.min(v.z, s),
    }
}