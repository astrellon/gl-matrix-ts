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
 * @param left the left vector
 * @param right the right vector
 * @returns the target vector
 */
export function vec3AddTo(left: vec3, right: rvec3)
{
    left.x += right.x;
    left.y += right.y;
    left.z += right.z;
    return left;
}

/**
 * Adds two vectors into a new vector
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
 * @param left the left vector
 * @param right the right vector
 * @returns the left vector
 */
export function vec3SubFrom(left: vec3, right: rvec3)
{
    left.x -= right.x;
    left.y -= right.y;
    left.z -= right.z;
    return left;
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
 * @param left the left vector
 * @param right the right vector
 * @returns the left vector
 */
export function vec3MulTo(left: vec3, right: rvec3)
{
    left.x *= right.x;
    left.y *= right.y;
    left.z *= right.z;
    return left;
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
 * @param left the left vector
 * @param right the right vector
 * @returns a new vector
 */
export function vec3DivBy(vec: vec3, other: rvec3)
{
    vec.x /= other.x;
    vec.y /= other.y;
    vec.z /= other.z;
    return vec;
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
 * @param scale amount to scale the vector by
 * @returns the target vector
 */
export function vec3ScaleBy(v: vec3, scale: number)
{
    v.x *= scale;
    v.y *= scale;
    v.z *= scale;
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
 * @returns distance between left and right
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
 * @returns squery distance between left and right
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
 * @params v the target vector
 * @returns the target vector
 */
export function vec3Inverse(v: vec3)
{
    v.x = 1.0 / v.x;
    v.y = 1.0 / v.y;
    v.z = 1.0 / v.z;
    return v;
}

/**
 * Returns the inverse of the components of a vector into a new vector
 *
 * @params v the target vector
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
export function vec3Normalize(v: vec3)
{
    let sqrtLen = vec3SquaredLength(v);
    if (sqrtLen > 0)
    {
        sqrtLen = 1.0 / Math.sqrt(sqrtLen);
    }

    v.x *= sqrtLen;
    v.y *= sqrtLen;
    v.z *= sqrtLen;
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
 * Computes the cross product of two vectors into the left vector
 * @param left the left vector
 * @param right the right vector
 * @returns the left vector
 */
export function vec3CrossBy(left: vec3, right: rvec3)
{
    const x = left.y * right.z - left.z * right.y;
    const y = left.z * right.x - left.x * right.z;
    const z = left.x * right.y - left.y * right.z;

    left.x = x;
    left.y = y;
    left.z = z;
    return left;
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
        z: left.x * right.y - left.y * right.z
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
 * @param left the left vector
 * @param right the right vector
 * @param t interpolation amount, in the range [0-1], between the two inputs
 * @returns the left vector
 */
export function vec3SlerpBy(left: vec3, right: rvec3, t: number)
{
    const angle = Math.acos(Math.min(Math.max(vec3Dot(left, right), -1), 1));
    const sinTotal = 1.0 / Math.sin(angle);

    const ratioA = Math.sin((1 - t) * angle) * sinTotal;
    const ratioB = Math.sin(t * angle) * sinTotal;

    const x = ratioA * left.x + ratioB * right.x;
    const y = ratioA * left.y + ratioB * right.y;
    const z = ratioA * left.z + ratioB * right.z;

    left.x = x;
    left.y = y;
    left.z = z;
    return left;
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
 * Creates a zero vector
 */
export function vec3Zero(): vec3
{
    return {x: 0, y: 0, z: 0}
}