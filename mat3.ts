import { rmat4 } from "./mat4";
import { rquat } from "./quat";
import { rvec2 } from "./vec2";

/**
 * 3x3 Matrix
 * @module mat3
 */

export interface mat3
{
    m00: number;
    m01: number;
    m02: number;
    m10: number;
    m11: number;
    m12: number;
    m20: number;
    m21: number;
    m22: number;
}

export type rmat3 = Readonly<mat3>;

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @returns {mat3} a new 3x3 matrix
 */
export function mat3Clone(m: rmat3): mat3
{
    return {
        m00: m.m00, m01: m.m01, m02: m.m02,
        m10: m.m10, m11: m.m11, m12: m.m12,
        m20: m.m20, m21: m.m21, m22: m.m22,
    }
}

/**
 * Copy the values from one mat3 to another, or in the case of mat4, it copies the same m00 -> m22 values
 *
 * @param left the left matrix
 * @param right the right matrix
 * @returns the left matrix
 */
export function mat3Copy(left: mat3, right: rmat3 | rmat4): mat3
{
    left.m00 = right.m00;
    left.m01 = right.m01;
    left.m02 = right.m02;
    left.m10 = right.m10;
    left.m11 = right.m11;
    left.m12 = right.m12;
    left.m20 = right.m20;
    left.m21 = right.m21;
    left.m22 = right.m22;

    return left;
}

  /**
   * Set the components of a mat3 to the given values
   *
   * @param m the target matrix
   * @param m00 Component in column 0, row 0 position (index 0)
   * @param m01 Component in column 0, row 1 position (index 1)
   * @param m02 Component in column 0, row 2 position (index 2)
   * @param m10 Component in column 1, row 0 position (index 3)
   * @param m11 Component in column 1, row 1 position (index 4)
   * @param m12 Component in column 1, row 2 position (index 5)
   * @param m20 Component in column 2, row 0 position (index 6)
   * @param m21 Component in column 2, row 1 position (index 7)
   * @param m22 Component in column 2, row 2 position (index 8)
   * @returns the target matrix
   */
export function mat3Set(m: mat3,
    m00: number, m01: number, m02: number,
    m10: number, m11: number, m12: number,
    m20: number, m21: number, m22: number)
{
    m.m00 = m00;
    m.m01 = m01;
    m.m02 = m02;
    m.m10 = m10;
    m.m11 = m11;
    m.m12 = m12;
    m.m20 = m20;
    m.m21 = m21;
    m.m22 = m22;

    return m;
}

  /**
   * Creates a new identity matrix
   *
   * @returns a new identity matrix
   */
export function mat3Identity(): mat3
{
    return {
        m00: 1, m01: 0, m02: 0,
        m10: 0, m11: 1, m12: 0,
        m20: 0, m21: 0, m22: 1,
    }
}

  /**
   * Transpose the values of a mat3
   *
   * @param m the target matrix
   * @returns the target matrix
   */
  export function mat3Transpose(m: mat3): mat3
  {
    const a01 = m.m01,
      a02 = m.m02,
      a12 = m.m12;

    m.m01 = m.m10;
    m.m02 = m.m20;
    m.m10 = a01;
    m.m12 = m.m21;
    m.m20 = a02;
    m.m21 = a12;

    return m;
  }

/**
 * Inverts a mat3
 *
 * @param m the target matrix
 * @returns the target matrix, or null if the determinate is zero
 */
export function mat3Invert(m: mat3): mat3 | null
{
    const a00 = m.m00,
      a01 = m.m01,
      a02 = m.m02;
    const a10 = m.m10,
      a11 = m.m11,
      a12 = m.m12;
    const a20 = m.m20,
      a21 = m.m21,
      a22 = m.m22;

    const b01 = a22 * a11 - a12 * a21;
    const b11 = -a22 * a10 + a12 * a20;
    const b21 = a21 * a10 - a11 * a20;

    // Calculate the determinant
    let det = a00 * b01 + a01 * b11 + a02 * b21;
    if (det === 0)
    {
      return null;
    }

    det = 1.0 / det;

    m.m00 = b01 * det;
    m.m01 = (-a22 * a01 + a02 * a21) * det;
    m.m02 = (a12 * a01 - a02 * a11) * det;
    m.m10 = b11 * det;
    m.m11 = (a22 * a00 - a02 * a20) * det;
    m.m12 = (-a12 * a00 + a02 * a10) * det;
    m.m20 = b21 * det;
    m.m21 = (-a21 * a00 + a01 * a20) * det;
    m.m22 = (a11 * a00 - a01 * a10) * det;

    return m;
}

/**
 * Calculates the adjugate of a mat3
 *
 * @param m the target matrix
 * @returns the target matrix
 */
export function mat3Adjoint(m: mat3)
{
    const a00 = m.m00,
      a01 = m.m01,
      a02 = m.m02;
    const a10 = m.m10,
      a11 = m.m11,
      a12 = m.m12;
    const a20 = m.m20,
      a21 = m.m21,
      a22 = m.m22;

    m.m00 = a11 * a22 - a12 * a21;
    m.m01 = a02 * a21 - a01 * a22;
    m.m02 = a01 * a12 - a02 * a11;
    m.m10 = a12 * a20 - a10 * a22;
    m.m11 = a00 * a22 - a02 * a20;
    m.m12 = a02 * a10 - a00 * a12;
    m.m20 = a10 * a21 - a11 * a20;
    m.m21 = a01 * a20 - a00 * a21;
    m.m22 = a00 * a11 - a01 * a10;
    return m;
}

/**
 * Calculates the determinant of a mat3
 *
 * @param m the target matrix
 * @returns determinant of the target matrix
 */
export function mat3Determinant(m: rmat3)
{
    return (
      m.m00 * ( m.m22 * m.m11 - m.m12 * m.m21) +
      m.m01 * (-m.m22 * m.m10 + m.m12 * m.m20) +
      m.m02 * ( m.m21 * m.m10 - m.m11 * m.m20)
    );
}

/**
 * Multiplies two mat3's
 * @param left the left matrix
 * @param right the right matrix
 * @returns the left matrix
 */
export function mat3Mul(left: mat3, right: rmat3)
{
    const a00 = left.m00,
      a01 = left.m01,
      a02 = left.m02;
    const a10 = left.m10,
      a11 = left.m11,
      a12 = left.m12;
    const a20 = left.m20,
      a21 = left.m21,
      a22 = left.m22;

    left.m00 = right.m00 * a00 + right.m01 * a10 + right.m02 * a20;
    left.m01 = right.m00 * a01 + right.m01 * a11 + right.m02 * a21;
    left.m02 = right.m00 * a02 + right.m01 * a12 + right.m02 * a22;

    left.m10 = right.m10 * a00 + right.m11 * a10 + right.m12 * a20;
    left.m11 = right.m10 * a01 + right.m11 * a11 + right.m12 * a21;
    left.m12 = right.m10 * a02 + right.m11 * a12 + right.m12 * a22;

    left.m20 = right.m20 * a00 + right.m21 * a10 + right.m22 * a20;
    left.m21 = right.m20 * a01 + right.m21 * a11 + right.m22 * a21;
    left.m22 = right.m20 * a02 + right.m21 * a12 + right.m22 * a22;

    return left;
}

/**
 * Translate a mat3 by the given vector
 * @param m the target matrix
 * @param v the translate vector
 * @returns the target matrix
 */
export function mat3Translate(m: mat3, v: rvec2)
{
    m.m20 = v.x * m.m00 + v.y * m.m10 + m.m20;
    m.m21 = v.x * m.m01 + v.y * m.m11 + m.m21;
    m.m22 = v.x * m.m02 + v.y * m.m12 + m.m22;

    return m;
}

/**
 * Rotates a mat3 by the given angle
 *
 * @param m the target matrix
 * @param rad the angle to rotate the matrix by
 * @returns the target matrix
 */
export function mat3Rotate(m: mat3, rad: number)
{
    const a00 = m.m00,
      a01 = m.m01,
      a02 = m.m02,
      a10 = m.m10,
      a11 = m.m11,
      a12 = m.m12,
      s = Math.sin(rad),
      c = Math.cos(rad);

    m.m00 = c * a00 + s * a10;
    m.m01 = c * a01 + s * a11;
    m.m02 = c * a02 + s * a12;

    m.m10 = c * a10 - s * a00;
    m.m11 = c * a11 - s * a01;
    m.m12 = c * a12 - s * a02;

    return m;
}

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param m the target matrix
 * @param v the vec2 to scale the matrix by
 * @returns the target matrix
 */
export function mat3Scale(m: mat3, v: rvec2)
{
    m.m00 = v.x * m.m00;
    m.m01 = v.x * m.m01;
    m.m02 = v.x * m.m02;

    m.m10 = v.y * m.m10;
    m.m11 = v.y * m.m11;
    m.m12 = v.y * m.m12;

    return m;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent creating an identity matrix and translating it.
 *
 * @param m the target matrix/new object
 * @param v the translation vector
 * @returns the target matrix
 */
export function mat3SetAsTranslation(m: any, v: rvec2)
{
    m.m00 = 1;
    m.m01 = 0;
    m.m02 = 0;
    m.m10 = 0;
    m.m11 = 1;
    m.m12 = 0;
    m.m20 = v.x;
    m.m21 = v.y;
    m.m22 = 1;

    return m;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent creating an identity matrix and rotating it.
 *
 * @param m the target matrix/new object
 * @param rad the angle to rotate the matrix by
 * @returns the target matrix
 */
export function mat3SetFromRotation(m: any, rad: number)
{
    const s = Math.sin(rad),
      c = Math.cos(rad);

    m.m00 = c;
    m.m01 = s;
    m.m02 = 0;

    m.m10 = -s;
    m.m11 = c;
    m.m12 = 0;

    m.m20 = 0;
    m.m21 = 0;
    m.m22 = 1;

    return m;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to creating an identity matrix and scaling it.
 *
 * @param m the target matrix/new object
 * @param s the scaling vector
 * @returns the target matrix
 */
export function mat3SetFromScaling(m: any, s: rvec2)
{
    m.m00 = s.x;
    m.m01 = 0;
    m.m02 = 0;

    m.m10 = 0;
    m.m11 = s.y;
    m.m12 = 0;

    m.m20 = 0;
    m.m21 = 0;
    m.m22 = 1;

    return m;
}

/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 * @param m the target matrix/new object
 * @param q the quaternion to create matrix from
 * @returns the target matrix
 */
export function mat3SetFromQuat(m: any, q: rquat)
{
    const x2 = q.x + q.x;
    const y2 = q.y + q.y;
    const z2 = q.z + q.z;

    const xx = q.x * x2;
    const yx = q.y * x2;
    const yy = q.y * y2;
    const zx = q.z * x2;
    const zy = q.z * y2;
    const zz = q.z * z2;
    const wx = q.w * x2;
    const wy = q.w * y2;
    const wz = q.w * z2;

    m.m00 = 1 - yy - zz;
    m.m10 = yx - wz;
    m.m20 = zx + wy;

    m.m01 = yx + wz;
    m.m11 = 1 - xx - zz;
    m.m21 = zy - wx;

    m.m02 = zx - wy;
    m.m12 = zy + wx;
    m.m22 = 1 - xx - yy;

    return m;
}

/**
 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
 *
 * @param left the target matrix/new object
 * @param right the matrix to derive the normal matrix from
 * @returns the target matrix or null if the right's determinant is invalid
 */
export function mat3SetNormalFromMat4(left: any, right: rmat4): mat3 | null
{
    const b00 = right.m00 * right.m11 - right.m01 * right.m10;
    const b01 = right.m00 * right.m12 - right.m02 * right.m10;
    const b02 = right.m00 * right.m13 - right.m03 * right.m10;
    const b03 = right.m01 * right.m12 - right.m02 * right.m11;
    const b04 = right.m01 * right.m13 - right.m03 * right.m11;
    const b05 = right.m02 * right.m13 - right.m03 * right.m12;
    const b06 = right.m20 * right.m31 - right.m21 * right.m30;
    const b07 = right.m20 * right.m32 - right.m22 * right.m30;
    const b08 = right.m20 * right.m33 - right.m23 * right.m30;
    const b09 = right.m21 * right.m32 - right.m22 * right.m31;
    const b10 = right.m21 * right.m33 - right.m23 * right.m31;
    const b11 = right.m22 * right.m33 - right.m23 * right.m32;

    // Calculate the determinant
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det)
    {
      return null;
    }
    det = 1.0 / det;

    left.m00 = (right.m11 * b11 - right.m12 * b10 + right.m13 * b09) * det;
    left.m01 = (right.m12 * b08 - right.m10 * b11 - right.m13 * b07) * det;
    left.m02 = (right.m10 * b10 - right.m11 * b08 + right.m13 * b06) * det;

    left.m10 = (right.m02 * b10 - right.m01 * b11 - right.m03 * b09) * det;
    left.m11 = (right.m00 * b11 - right.m02 * b08 + right.m03 * b07) * det;
    left.m12 = (right.m01 * b08 - right.m00 * b10 - right.m03 * b06) * det;

    left.m20 = (right.m31 * b05 - right.m32 * b04 + right.m33 * b03) * det;
    left.m21 = (right.m32 * b02 - right.m30 * b05 - right.m33 * b01) * det;
    left.m22 = (right.m30 * b04 - right.m31 * b02 + right.m33 * b00) * det;

    return left;
}

/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param m the target matrix
 * @param width Width of your gl context
 * @param height Height of gl context
 * @returns the target matrix
 */
export function mat3SetProjection(m: any, width: number, height: number)
{
    m.m00 = 2 / width;
    m.m01 = 0;
    m.m02 = 0;
    m.m10 = 0;
    m.m11 = -2 / height;
    m.m12 = 0;
    m.m20 = -1;
    m.m21 = 1;
    m.m22 = 1;

    return m;
}

/**
 * Returns Frobenius norm of a mat3
 *
 * @param m the matrix to calculate Frobenius norm of
 * @returns the Frobenius norm
 */
export function mat3Frob(m: rmat3)
{
    return Math.sqrt(
        m.m00 ** 2 + m.m01 ** 2 + m.m02 ** 2 +
        m.m10 ** 2 + m.m11 ** 2 + m.m22 ** 2 +
        m.m20 ** 2 + m.m21 ** 2 + m.m22 ** 2
    );
}

/**
 * Adds two mat3's
 *
 * @param left the left matrix
 * @param right the right matrix
 * @returns the left matrix
 */
export function mat3Add(left: mat3, right: rmat3)
{
    left.m00 += right.m00;
    left.m01 += right.m01;
    left.m02 += right.m02;
    left.m10 += right.m10;
    left.m11 += right.m11;
    left.m12 += right.m12;
    left.m20 += right.m20;
    left.m21 += right.m21;
    left.m22 += right.m22;

    return left;
}

/**
 * Subtracts matrix b from matrix a
 * @param {mat3} matrix the second operand
 * @returns {mat3} data
 */
export function mat3Sub(left: mat3, right: rmat3)
{
    left.m00 -= right.m00;
    left.m01 -= right.m01;
    left.m02 -= right.m02;
    left.m10 -= right.m10;
    left.m11 -= right.m11;
    left.m12 -= right.m12;
    left.m20 -= right.m20;
    left.m21 -= right.m21;
    left.m22 -= right.m22;

    return left;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {number} s amount to scale the matrix's elements by
 * @returns {mat3} data
 */
export function mat3MulScalar(m: mat3, s: number)
{
    m.m00 *= s;
    m.m01 *= s;
    m.m02 *= s;
    m.m10 *= s;
    m.m11 *= s;
    m.m12 *= s;
    m.m20 *= s;
    m.m21 *= s;
    m.m22 *= s;

    return m;
}