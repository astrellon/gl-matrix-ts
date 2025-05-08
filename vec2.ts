import { vec3 } from "./vec3";

export interface vec2
{
    x: number;
    y: number;
}

export type rvec2 = Readonly<vec2>;

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param v the vector to clone
 * @returns a new vector
 */
export function vec2Clone(v: rvec2): vec2
{
    return {x: v.x, y: v.y};
}

/**
 * Copy the values from one vec2 to another
 *
 * @param v the source vector
 * @param a the copy vector
 * @returns the target vector
 */
export function vec2Copy(v: vec2, a: rvec2)
{
    v.x = a.x;
    v.y = a.y;
    return v;
}

/**
 * Set the components of a vec2 to the given values
 *
 * @param v the target vector
 * @param x X component
 * @param y Y component
 * @returns the target vector
 */
export function vec2Set(v: vec2, x: number, y: number)
{
    v.x = x;
    v.y = y;
    return v;
}

/**
 * Calculates the length of a vector
 *
 * @params v the target vector
 * @returns length of a
 */
export function vec2Length(v: rvec2)
{
    return Math.sqrt(v.x ** 2 + v.y ** 2);
}

/**
 * Calculates the length of a vector
 *
 * @params v the target vector
 * @returns length of a
 */
export function vec2LengthValues(x: number, y: number)
{
    return Math.sqrt(x ** 2 + y ** 2);
}


/**
 * Calculates the squared length of a vec2
 *
 * @params v the target vector
 * @returns squared length of a
 */
export function vec2SquaredLength(v: rvec2)
{
    return v.x ** 2 + v.y ** 2;
}

/**
 * Adds vector other into vec
 * @param left the left vector
 * @param right the right vector
 * @returns the target vector
 */
export function vec2AddTo(left: vec2, right: rvec2)
{
    left.x += right.x;
    left.y += right.y;
    return left;
}

/**
 * Adds two vectors into a new vector
 * @param left the left vector
 * @param right the right vector
 * @returns a new vector
 */
export function vec2Add(left: rvec2, right: rvec2): vec2
{
    return {
        x: left.x + right.x,
        y: left.y + right.y
    }
}

/**
 * Subtracts vector other from vector vec
 * @param left the left vector
 * @param right the right vector
 * @returns the left vector
 */
export function vec2SubFrom(left: vec2, right: rvec2)
{
    left.x -= right.x;
    left.y -= right.y;
    return left;
}

/**
 * Subtracts vector other from vector vec into a new vector
 * @param left the left vector
 * @param right the right vector
 * @returns a new vector
 */
export function vec2Sub(left: rvec2, right: rvec2): vec2
{
    return {
        x: left.x - right.x,
        y: left.y - right.y,
    }
}

/**
 * Multiplies the left vector by the right vector
 * @param left the left vector
 * @param right the right vector
 * @returns the left vector
 */
export function vec2MulTo(left: vec2, right: rvec2)
{
    left.x *= right.x;
    left.y *= right.y;
    return left;
}

/**
 * Multiplies the left vector by the right vector into a new vector
 * @param left the left vector
 * @param right the right vector
 * @returns a new vector
 */
export function vec2Mul(left: rvec2, right: rvec2): vec2
{
    return {
        x: left.x * right.x,
        y: left.y * right.y
    }
}

/**
 * Divides the left vector by the right vector
 * @param left the left vector
 * @param right the right vector
 * @returns a new vector
 */
export function vec2DivBy(vec: vec2, other: rvec2)
{
    vec.x /= other.x;
    vec.y /= other.y;
    return vec;
}

/**
 * Divides the left vector by the right vector into a new vector
 * @param left the left vector
 * @param right the right vector
 * @returns a new vector
 */
export function vec2Div(left: rvec2, right: rvec2): vec2
{
    return {
        x: left.x / right.x,
        y: left.y / right.y
    }
}

/**
 * Scales the target vector by a scalar number
 * @param v the target vector
 * @param scale amount to scale the vector by
 * @returns the target vector
 */
export function vec2ScaleBy(v: vec2, scale: number)
{
    v.x *= scale;
    v.y *= scale;
    return v;
}

/**
 * Scales the target vector by a scalar number into a new vector
 * @param v the target vector
 * @param scale amount to scale the vector by
 * @returns a new vector
 */
export function vec2Scale(v: rvec2, scale: number): vec2
{
    return {
        x: v.x * scale,
        y: v.y * scale
    };
}

export function vec2ScaleAndAdd(left: rvec2, right: rvec2, scale: number): vec2
{
    return {
        x: left.x + (right.x * scale),
        y: left.y + (right.y * scale),
    }
}

/**
 * Calculates the Euclidean distance between two vectors
 * @param left the left operand
 * @param right the right operand
 * @returns distance between left and right
 */
export function vec2Distance(left: rvec2, right: rvec2)
{
    const dx = left.x - right.x;
    const dy = left.y - right.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
}

/**
 * Calculates the squared euclidean distance between two vectors
 * @param left the left operand
 * @param right the right operand
 * @returns squery distance between left and right
 */
export function vec2SquaredDistance(left: rvec2, right: rvec2)
{
    const dx = left.x - right.x;
    const dy = left.y - right.y;
    return dx ** 2 + dy ** 2;
}

/**
 * Negates the components of vector v
 * @param v the target vector
 * @returns the target vector
 */
export function vec2Negate(v: vec2)
{
    v.x = -v.x;
    v.y = -v.y;
    return v;
}

/**
 * Negates the components of vector v into a new vector
 * @param v the target vector
 * @returns a new vector
 */
export function vec2Negated(v: rvec2): vec2
{
    return {
        x: -v.x,
        y: -v.y
    }
}

/**
 * Inverse of the components of a vector
 *
 * @params v the target vector
 * @returns the target vector
 */
export function vec2Inverse(v: vec2)
{
    v.x = 1.0 / v.x;
    v.y = 1.0 / v.y;
    return v;
}

/**
 * Returns the inverse of the components of a vector into a new vector
 *
 * @params v the target vector
 * @returns a new vector
 */
export function vec2Inversed(v: rvec2): vec2
{
    return {
        x: 1.0 / v.x,
        y: 1.0 / v.y
    };
}

/**
 * Normalize the given vector v
 * @param v the target vector
 * @returns the target vector
 */
export function vec2Normalize(v: vec2)
{
    let sqrtLen = vec2SquaredLength(v);
    if (sqrtLen > 0)
    {
        sqrtLen = 1.0 / Math.sqrt(sqrtLen);
    }

    v.x *= sqrtLen;
    v.y *= sqrtLen;
    return v;
}

/**
 * Normalize the given vector v into a new vector
 * @param v the target vector
 * @returns a new vector
 */
export function vec2Normalized(v: rvec2): vec2
{
    let sqrtLen = vec2SquaredLength(v);
    if (sqrtLen > 0)
    {
        sqrtLen = 1.0 / Math.sqrt(sqrtLen);
    }

    return {
        x: v.x * sqrtLen,
        y: v.y * sqrtLen
    }
}

/**
 * Calculates the dot product of two vec2's
 * @param left the left vector
 * @param right the right vector
 * @returns dot product of left and right
 */
export function vec2Dot(left: rvec2, right: rvec2)
{
    return left.x * right.x + left.y * right.y;
}

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 * @param left the left vector
 * @param right the right vector
 * @returns the resulting 3D vector, will only have a z value.
 */
export function vec2Cross(left: rvec2, right: rvec2): vec3
{
    const z = left.x * right.y - left.y * right.x;
    return {x: 0, y: 0, z};
}

/**
 * Performs a linear interpolation between two vectors into a new vector
 *
 * @param left the left vector
 * @param right the right vector
 * @param t interpolation amount, in the range [0-1], between the two inputs (not clamped)
 * @returns a new vector
 */
export function vec2Lerp(left: rvec2, right: rvec2, t: number): vec2
{
    return {
        x: left.x + t * (right.x - left.x),
        y: left.y + t * (right.y - left.y)
    };
}

  /**
   * Transforms the vec2 with a mat2
   * @param {ReadonlyMat2} matrix matrix to transform with
   * @returns {vec2} out
   */
//   transformMat2(matrix: mat2) {
//     const data=this.data
//     const m=matrix.data;
//     var x = data[0],
//       y = data[1];
//     return this.set(
//       m[0] * x + m[2] * y,
//       m[1] * x + m[3] * y
//     );
//   }


  /**
   * Transforms the vec2 with a mat3
   * 3rd vector component is implicitly '1'
   *
   * @param {mat3} matrix matrix to transform with
   * @returns {vec2} out
   */
//   transformMat3(matrix: mat3) {
//     const a=this.data;
//     const m=matrix.data;
//     var x = a[0],
//       y = a[1];
//     return this.set(
//       m[0] * x + m[3] * y + m[6],
//       m[1] * x + m[4] * y + m[7]
//     );
//   }

  /**
   * Transforms the vec2 with a mat4
   * 3rd vector component is implicitly '0'
   * 4th vector component is implicitly '1'
   * @param {mat4} matrix matrix to transform with
   * @returns {vec2} out
   */
//   transformMat4(matrix: mat4) {
//     const a=this.data;
//     const m=matrix.data;
//     let x = a[0];
//     let y = a[1];
//     return this.set(
//       m[0] * x + m[4] * y + m[12],
//       m[1] * x + m[5] * y + m[13]
//     );
//   }

  /**
   * Rotate a 2D vector
   * @param {vec2} origin The origin of the rotation
   * @param {number} rad The angle of rotation in radians
   * @returns {vec2} out
   */
//   rotate(origin: vec2, rad: number) {
//     const a=this.data;
//     const b=origin.data;
//     //Translate point to the origin
//     let p0 = a[0] - b[0],
//       p1 = a[1] - b[1],
//       sinC = Math.sin(rad),
//       cosC = Math.cos(rad);

//     //perform rotation and translate to correct position

//     return this.set(
//       p0 * cosC - p1 * sinC + b[0],
//       p0 * sinC + p1 * cosC + b[1]
//     );
//   }

  /**
   * Get the angle between two 2D vectors
   * @param {vec2} vector The second operand
   * @returns {number} The angle in radians
   */
//   angle(vector: vec2) {
//     const a=this.data;
//     const b=vector.data
//     let x1 = a[0],
//       y1 = a[1],
//       x2 = b[0],
//       y2 = b[1],
//       // mag is the product of the magnitudes of a and b
//       mag = Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2)),
//       // mag &&.. short circuits if mag == 0
//       cosine = mag && (x1 * x2 + y1 * y2) / mag;
//     // Math.min(Math.max(cosine, -1), 1) clamps the cosine between -1 and 1
//     return Math.acos(Math.min(Math.max(cosine, -1), 1));
//   }

/**
 * Creates a zero vector
 */
export function vec2Zero(): vec2
{
    return {x: 0, y: 0}
}