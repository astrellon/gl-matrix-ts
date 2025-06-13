export interface vec4
{
    x: number;
    y: number;
    z: number;
    w: number;
}

export type rvec4 = Readonly<vec4>;

/**
 * Clones this vector
 *
 * @param v the vector to clone
 * @returns a new vector
 */
export function vec4Clone(v: rvec4): vec4
{
    return {x: v.x, y: v.y, z: v.z, w: v.w};
}

/**
 * Copy the values from one vec4 to another
 * @param v the target vector
 * @param a the copy vector
 * @returns the target vector
 */
export function vec4Copy(v: vec4, a: rvec4)
{
    v.x = a.x;
    v.y = a.y;
    v.z = a.z;
    v.w = a.w;
    return v;
}

/**
 * Set the components of a vec4 to the given values
 *
 * @param v the target vector
 * @param x X component
 * @param y Y component
 * @param z Z component
 * @param w W component
 * @returns the target vector
 */
export function vec4Set(v: vec4, x: number, y: number, z: number, w: number)
{
    v.x = x;
    v.y = y;
    v.z = z;
    v.w = w;
    return v;
}

/**
 * Calculates the length vector v
 *
 * @params the source vector
 * @returns length of v
 */
export function vec4Length(v: rvec4)
{
    return Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2 + v.w ** 2);
}

/**
 * Calculates the squared length of a vec4
 *
 * @params the source vector
 * @returns squared length of v
 */
export function vec4SquaredLength(v: rvec4)
{
    return v.x ** 2 + v.y ** 2 + v.z ** 2 + v.w ** 2;
}

/**
 * Adds vector other into vec
 * @param left the left vector
 * @param right the right vector
 * @returns the target vector
 */
export function vec4AddTo(left: vec4, right: rvec4)
{
    left.x += right.x;
    left.y += right.y;
    left.z += right.z;
    left.w += right.w;
    return left;
}

/**
 * Adds two vectors into a new vector
 * @param left the left vector
 * @param right the right vector
 * @returns a new vector
 */
export function vec4Add(left: rvec4, right: rvec4): vec4
{
    return {
        x: left.x + right.x,
        y: left.y + right.y,
        z: left.z + right.z,
        w: left.w + right.w
    }
}

/**
 * Subtracts vector other from vector vec
 * @param left the left vector
 * @param right the right vector
 * @returns the left vector
 */
export function vec4SubFrom(left: vec4, right: rvec4)
{
    left.x -= right.x;
    left.y -= right.y;
    left.z -= right.z;
    left.w -= right.w;
    return left;
}

/**
 * Subtracts vector other from vector vec into a new vector
 * @param left the left vector
 * @param right the right vector
 * @returns a new vector
 */
export function vec4Sub(left: rvec4, right: rvec4): vec4
{
    return {
        x: left.x - right.x,
        y: left.y - right.y,
        z: left.z - right.z,
        w: left.w - right.w,
    }
}

/**
 * Multiplies the left vector by the right vector
 * @param left the left vector
 * @param right the right vector
 * @returns the left vector
 */
export function vec4MulTo(left: vec4, right: rvec4)
{
    left.x *= right.x;
    left.y *= right.y;
    left.z *= right.z;
    left.w *= right.w;
    return left;
}

/**
 * Multiplies the left vector by the right vector into a new vector
 * @param left the left vector
 * @param right the right vector
 * @returns a new vector
 */
export function vec4Mul(left: rvec4, right: rvec4): vec4
{
    return {
        x: left.x * right.x,
        y: left.y * right.y,
        z: left.z * right.z,
        w: left.w * right.w,
    }
}

/**
 * Divides the left vector by the right vector
 * @param left the left vector
 * @param right the right vector
 * @returns a new vector
 */
export function vec4DivBy(vec: vec4, other: rvec4)
{
    vec.x /= other.x;
    vec.y /= other.y;
    vec.z /= other.z;
    vec.w /= other.w;
    return vec;
}

/**
 * Divides the left vector by the right vector into a new vector
 * @param left the left vector
 * @param right the right vector
 * @returns a new vector
 */
export function vec4Div(left: rvec4, right: rvec4): vec4
{
    return {
        x: left.x / right.x,
        y: left.y / right.y,
        z: left.z / right.z,
        w: left.w / right.w,
    }
}

/**
 * Scales the target vector by a scalar number
 * @param v the target vector
 * @param scale amount to scale the vector by
 * @returns the target vector
 */
export function vec4ScaleBy(v: vec4, scale: number)
{
    v.x *= scale;
    v.y *= scale;
    v.z *= scale;
    v.w *= scale;
    return v;
}

/**
 * Scales the target vector by a scalar number into a new vector
 * @param v the target vector
 * @param scale amount to scale the vector by
 * @returns a new vector
 */
export function vec4Scale(v: rvec4, scale: number): vec4
{
    return {
        x: v.x * scale,
        y: v.y * scale,
        z: v.z * scale,
        w: v.w * scale
    };
}

/**
 * Calculates the Euclidean distance between two vectors
 * @param left the left operand
 * @param right the right operand
 * @returns distance between left and right
 */
export function vec4Distance(left: rvec4, right: rvec4)
{
    const dx = left.x - right.x;
    const dy = left.y - right.y;
    const dz = left.z - right.z;
    const dw = left.w - right.w;
    return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2 + dw ** 2);
}

/**
 * Calculates the squared euclidean distance between two vectors
 * @param left the left operand
 * @param right the right operand
 * @returns squery distance between left and right
 */
export function vec4SquaredDistance(left: rvec4, right: rvec4)
{
    const dx = left.x - right.x;
    const dy = left.y - right.y;
    const dz = left.z - right.z;
    const dw = left.w - right.w;
    return dx ** 2 + dy ** 2 + dz ** 2 + dw ** 2;
}

/**
 * Negates the components of vector v
 * @param v the target vector
 * @returns the target vector
 */
export function vec4Negate(v: vec4)
{
    v.x = -v.x;
    v.y = -v.y;
    v.z = -v.z;
    v.w = -v.w;
    return v;
}

/**
 * Negates the components of vector v into a new vector
 * @param v the target vector
 * @returns a new vector
 */
export function vec4Negated(v: rvec4): vec4
{
    return {
        x: -v.x,
        y: -v.y,
        z: -v.z,
        w: -v.w
    }
}

/**
 * Inverse of the components of a vector
 *
 * @params v the target vector
 * @returns the target vector
 */
export function vec4Inverse(v: vec4)
{
    v.x = 1.0 / v.x;
    v.y = 1.0 / v.y;
    v.z = 1.0 / v.z;
    v.w = 1.0 / v.w;
    return v;
}

/**
 * Returns the inverse of the components of a vector into a new vector
 *
 * @params v the target vector
 * @returns a new vector
 */
export function vec4Inversed(v: rvec4): vec4
{
    return {
        x: 1.0 / v.x,
        y: 1.0 / v.y,
        z: 1.0 / v.z,
        w: 1.0 / v.w
    };
}

/**
 * Normalize the given vector v
 * @param v the target vector
 * @returns the target vector
 */
export function vec4Normalize(v: vec4)
{
    let sqrtLen = vec4SquaredLength(v);
    if (sqrtLen > 0)
    {
        sqrtLen = 1.0 / Math.sqrt(sqrtLen);
    }

    v.x *= sqrtLen;
    v.y *= sqrtLen;
    v.z *= sqrtLen;
    v.w *= sqrtLen;
    return v;
}

/**
 * Normalize the given vector v into a new vector
 * @param v the target vector
 * @returns a new vector
 */
export function vec4Normalized(v: rvec4): vec4
{
    let sqrtLen = vec4SquaredLength(v);
    if (sqrtLen > 0)
    {
        sqrtLen = 1.0 / Math.sqrt(sqrtLen);
    }

    return {
        x: v.x * sqrtLen,
        y: v.y * sqrtLen,
        z: v.z * sqrtLen,
        w: v.w * sqrtLen
    }
}

/**
 * Calculates the dot product of two vec4's
 * @param left the left vector
 * @param right the right vector
 * @returns dot product of left and right
 */
export function vec4Dot(left: rvec4, right: rvec4)
{
    return left.x * right.x + left.y * right.y + left.z * right.z + left.w * right.w;
}


/**
 * Returns the cross-product of three vectors in a 4-dimensional space
 *
 * @param v1 the first vector
 * @param v2 the second vector
 * @param v3 the third vector
 * @returns a new vector
 */
export function vec4Cross(v1: rvec4, v2: rvec4, v3: rvec4): vec4
{
    const A = v2.x * v3.y - v2.y * v3.x,
      B = v2.x * v3.z - v2.z * v3.x,
      C = v2.x * v3.w - v2.w * v3.x,
      D = v2.y * v3.z - v2.z * v3.y,
      E = v2.y * v3.w - v2.w * v3.y,
      F = v2.z * v3.w - v2.w * v3.z;
    const G = v1.x;
    const H = v1.y;
    const I = v1.z;
    const J = v1.w;

    return {
      x: H * F - I * E + J * D,
      y: -(G * F) + I * C - J * B,
      z: G * E - H * C + J * A,
      w: -(G * D) + H * B - I * A
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
export function vec4Lerp(left: rvec4, right: rvec4, t: number): vec4
{
    return {
        x: left.x + t * (right.x - left.x),
        y: left.y + t * (right.y - left.y),
        z: left.z + t * (right.z - left.z),
        w: left.w + t * (right.w - left.w)
    };
}


  /**
   * Transforms the vec4 with a mat4.
   * @param {mat4} matrix matrix to transform with
   * @returns {vec4} out
   */
  /*
  transformMat4(matrix: mat4) {
    const { data: out, data: a } = this;
    const m = matrix.data;
    let x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return this;
  }
    */

  /**
   * Transforms the vec4 with a quat
   * @param {ReadonlyQuat} rotation quaternion to transform with
   * @returns {vec4} out
   */
  /*
  transformQuat(rotation: quat) {
    const { data: out, data: a } = this;
    const q = rotation.data;
    let x = a[0],
      y = a[1],
      z = a[2];
    let qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];

    // calculate quat * vec
    let ix = qw * x + qy * z - qz * y;
    let iy = qw * y + qz * x - qx * z;
    let iz = qw * z + qx * y - qy * x;
    let iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return this;
  }*/

/**
 * Creates a zero vector
 */
export function vec4Zero(): vec4
{
    return {x: 0, y: 0, z: 0, w: 0}
}

export function vec4One(): vec4
{
    return {x: 1, y: 1, z: 1, w: 1}
}

export function vec4ApproxEquals(left: rvec4, right: rvec4, delta: number = 0.0001)
{
    // Checked if doing a Math.abs check on the diff of each element was faster or not
    // https://jsperf.app/nukupa
    // Looked like using the distance was faster in general.
    return vec4Distance(left, right) < delta;
}