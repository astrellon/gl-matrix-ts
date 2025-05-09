import mathf from "./mathf";
import { quat, rquat } from "./quat";
import { vec3, rvec3, vec3Zero } from "./vec3";

/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 */
export interface mat4
{
    m00: number;
    m01: number;
    m02: number;
    m03: number;
    m10: number;
    m11: number;
    m12: number;
    m13: number;
    m20: number;
    m21: number;
    m22: number;
    m23: number;
    m30: number;
    m31: number;
    m32: number;
    m33: number;
}

export type rmat4 = Readonly<mat4>;

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
export function mat4Clone(m: rmat4): mat4
{
    return {
        m00: m.m00, m01: m.m01, m02: m.m02, m03: m.m03,
        m10: m.m10, m11: m.m11, m12: m.m12, m13: m.m13,
        m20: m.m20, m21: m.m21, m22: m.m22, m23: m.m23,
        m30: m.m30, m31: m.m31, m32: m.m32, m33: m.m33
    }
}

/**
 * Copy the values from one mat4 to another
 * @returns {mat4} out
 */
export function mat4Copy(left: mat4, right: rmat4): mat4
{
    left.m00 = right.m00;
    left.m01 = right.m01;
    left.m02 = right.m02;
    left.m03 = right.m03;
    left.m10 = right.m10;
    left.m11 = right.m11;
    left.m12 = right.m12;
    left.m13 = right.m13;
    left.m20 = right.m20;
    left.m21 = right.m21;
    left.m22 = right.m22;
    left.m23 = right.m23;
    left.m30 = right.m30;
    left.m31 = right.m31;
    left.m32 = right.m32;
    left.m33 = right.m33;
    return left;
}

/**
 * Set the components of a mat4 to the given values
 *
 * @param {number} m00 Component in column 0, row 0 position (index 0)
 * @param {number} m01 Component in column 0, row 1 position (index 1)
 * @param {number} m02 Component in column 0, row 2 position (index 2)
 * @param {number} m03 Component in column 0, row 3 position (index 3)
 * @param {number} m10 Component in column 1, row 0 position (index 4)
 * @param {number} m11 Component in column 1, row 1 position (index 5)
 * @param {number} m12 Component in column 1, row 2 position (index 6)
 * @param {number} m13 Component in column 1, row 3 position (index 7)
 * @param {number} m20 Component in column 2, row 0 position (index 8)
 * @param {number} m21 Component in column 2, row 1 position (index 9)
 * @param {number} m22 Component in column 2, row 2 position (index 10)
 * @param {number} m23 Component in column 2, row 3 position (index 11)
 * @param {number} m30 Component in column 3, row 0 position (index 12)
 * @param {number} m31 Component in column 3, row 1 position (index 13)
 * @param {number} m32 Component in column 3, row 2 position (index 14)
 * @param {number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */
export function mat4Set(
    m: mat4,
    m00: number,
    m01: number,
    m02: number,
    m03: number,
    m10: number,
    m11: number,
    m12: number,
    m13: number,
    m20: number,
    m21: number,
    m22: number,
    m23: number,
    m30: number,
    m31: number,
    m32: number,
    m33: number)
{
    m.m00 = m00;
    m.m01 = m01;
    m.m02 = m02;
    m.m03 = m03;
    m.m10 = m10;
    m.m11 = m11;
    m.m12 = m12;
    m.m13 = m13;
    m.m20 = m20;
    m.m21 = m21;
    m.m22 = m22;
    m.m23 = m23;
    m.m30 = m30;
    m.m31 = m31;
    m.m32 = m32;
    m.m33 = m33;
    return m;
}

/**
 * Creates a mat4 identity matrix
 */
export function mat4Identity(): mat4
{
    return {
        m00: 1, m01: 0, m02: 0, m03: 0,
        m10: 0, m11: 1, m12: 0, m13: 0,
        m20: 0, m21: 0, m22: 1, m23: 0,
        m30: 0, m31: 0, m32: 0, m33: 1
    }
}

/**
 * Transpose the values of a mat4
 *
 * @returns {mat4} out
 */
export function mat4Transpose(m: mat4): mat4
{
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    const a01 = m.m01,
      a02 = m.m02,
      a03 = m.m03;
    const a12 = m.m12,
      a13 = m.m13;
    const a23 = m.m23;

    m.m01 = m.m10;
    m.m02 = m.m20;
    m.m03 = m.m30;
    m.m10 = a01;
    m.m12 = m.m21;
    m.m13 = m.m31;
    m.m20 = a02;
    m.m21 = a12;
    m.m23 = m.m32;
    m.m30 = a03;
    m.m31 = a13;
    m.m32 = a23;
    return m;
}

/**
 * Inverts a mat4
 *
 * @returns {mat4} out
 */
export function mat4Invert(m: mat4): mat4
{
    const a00 = m.m00,
      a01 = m.m01,
      a02 = m.m02,
      a03 = m.m03;
    const a10 = m.m10,
      a11 = m.m11,
      a12 = m.m12,
      a13 = m.m13;
    const a20 = m.m20,
      a21 = m.m21,
      a22 = m.m22,
      a23 = m.m23;
    const a30 = m.m30,
      a31 = m.m31,
      a32 = m.m32,
      a33 = m.m33;

    const b00 = a00 * a11 - a01 * a10;
    const b01 = a00 * a12 - a02 * a10;
    const b02 = a00 * a13 - a03 * a10;
    const b03 = a01 * a12 - a02 * a11;
    const b04 = a01 * a13 - a03 * a11;
    const b05 = a02 * a13 - a03 * a12;
    const b06 = a20 * a31 - a21 * a30;
    const b07 = a20 * a32 - a22 * a30;
    const b08 = a20 * a33 - a23 * a30;
    const b09 = a21 * a32 - a22 * a31;
    const b10 = a21 * a33 - a23 * a31;
    const b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return null;
    }
    det = 1.0 / det;

    m.m00 = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    m.m01 = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    m.m02 = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    m.m03 = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    m.m10 = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    m.m11 = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    m.m12 = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    m.m13 = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    m.m20 = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    m.m21 = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    m.m22 = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    m.m23 = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    m.m30 = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    m.m31 = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    m.m32 = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    m.m33 = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return m;
}

  /**
   * Calculates the adjugate of a mat4
   *
   * @returns {mat4} out
   */
  export function mat4Adjoint(m: mat4): mat4
  {
    const a00 = m.m00,
      a01 = m.m01,
      a02 = m.m02,
      a03 = m.m03;
    const a10 = m.m10,
      a11 = m.m11,
      a12 = m.m12,
      a13 = m.m13;
    const a20 = m.m20,
      a21 = m.m21,
      a22 = m.m22,
      a23 = m.m23;
    const a30 = m.m30,
      a31 = m.m31,
      a32 = m.m32,
      a33 = m.m33;

    const b00 = a00 * a11 - a01 * a10;
    const b01 = a00 * a12 - a02 * a10;
    const b02 = a00 * a13 - a03 * a10;
    const b03 = a01 * a12 - a02 * a11;
    const b04 = a01 * a13 - a03 * a11;
    const b05 = a02 * a13 - a03 * a12;
    const b06 = a20 * a31 - a21 * a30;
    const b07 = a20 * a32 - a22 * a30;
    const b08 = a20 * a33 - a23 * a30;
    const b09 = a21 * a32 - a22 * a31;
    const b10 = a21 * a33 - a23 * a31;
    const b11 = a22 * a33 - a23 * a32;

    m.m00 = a11 * b11 - a12 * b10 + a13 * b09;
    m.m01 = a02 * b10 - a01 * b11 - a03 * b09;
    m.m02 = a31 * b05 - a32 * b04 + a33 * b03;
    m.m03 = a22 * b04 - a21 * b05 - a23 * b03;
    m.m10 = a12 * b08 - a10 * b11 - a13 * b07;
    m.m11 = a00 * b11 - a02 * b08 + a03 * b07;
    m.m12 = a32 * b02 - a30 * b05 - a33 * b01;
    m.m13 = a20 * b05 - a22 * b02 + a23 * b01;
    m.m20 = a10 * b10 - a11 * b08 + a13 * b06;
    m.m21 = a01 * b08 - a00 * b10 - a03 * b06;
    m.m22 = a30 * b04 - a31 * b02 + a33 * b00;
    m.m23 = a21 * b02 - a20 * b04 - a23 * b00;
    m.m30 = a11 * b07 - a10 * b09 - a12 * b06;
    m.m31 = a00 * b09 - a01 * b07 + a02 * b06;
    m.m32 = a31 * b01 - a30 * b03 - a32 * b00;
    m.m33 = a20 * b03 - a21 * b01 + a22 * b00;

    return m;
  }

/**
 * Calculates the determinant of a mat4
 *
 * @returns {number} determinant of a
 */
export function mat4Determinant(m: rmat4)
{
    const b0 = m.m00 * m.m11 - m.m01 * m.m10;
    const b1 = m.m00 * m.m12 - m.m02 * m.m10;
    const b2 = m.m01 * m.m12 - m.m02 * m.m11;
    const b3 = m.m20 * m.m31 - m.m21 * m.m30;
    const b4 = m.m20 * m.m32 - m.m22 * m.m30;
    const b5 = m.m21 * m.m32 - m.m22 * m.m31;
    const b6 = m.m00 * b5 - m.m01 * b4 + m.m02 * b3;
    const b7 = m.m10 * b5 - m.m11 * b4 + m.m12 * b3;
    const b8 = m.m20 * b2 - m.m21 * b1 + m.m22 * b0;
    const b9 = m.m30 * b2 - m.m31 * b1 + m.m32 * b0;

    // Calculate the determinant
    return m.m13 * b6 - m.m03 * b7 + m.m33 * b8 - m.m23 * b9;
}

  /**
   * Multiplies two mat4s
   *
   * @param {mat4} matrix the second operand
   * @returns {mat4} out
   */
  export function mat4Mul(left: mat4, right: rmat4)
  {
    const a00 = left.m00,
      a01 = left.m01,
      a02 = left.m02,
      a03 = left.m03;
    const a10 = left.m10,
      a11 = left.m11,
      a12 = left.m12,
      a13 = left.m13;
    const a20 = left.m20,
      a21 = left.m21,
      a22 = left.m22,
      a23 = left.m23;
    const a30 = left.m30,
      a31 = left.m31,
      a32 = left.m32,
      a33 = left.m33;

    // Cache only the current line of the second matrix
    let b0 = right.m00,
      b1 = right.m01,
      b2 = right.m02,
      b3 = right.m03;
    left.m00 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    left.m01 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    left.m02 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    left.m03 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = right.m10;
    b1 = right.m11;
    b2 = right.m12;
    b3 = right.m13;
    left.m10 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    left.m11 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    left.m12 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    left.m13 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = right.m20;
    b1 = right.m21;
    b2 = right.m22;
    b3 = right.m23;
    left.m20 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    left.m21 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    left.m22 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    left.m23 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = right.m30;
    b1 = right.m31;
    b2 = right.m32;
    b3 = right.m33;
    left.m30 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    left.m31 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    left.m32 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    left.m33 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    return left;
  }

/**
 * Translate a mat4 by the given vector
 *
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
export function mat4Translate(m: mat4, v: rvec3)
{
    m.m30 = m.m00 * v.x + m.m10 * v.y + m.m20 * v.z + m.m30;
    m.m31 = m.m01 * v.x + m.m11 * v.y + m.m21 * v.z + m.m31;
    m.m32 = m.m02 * v.x + m.m12 * v.y + m.m22 * v.z + m.m32;
    m.m33 = m.m03 * v.x + m.m13 * v.y + m.m23 * v.z + m.m33;

    return m;
}

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
export function mat4Scale(m: mat4, v: rvec3)
{
    m.m00 = m.m00 * v.x;
    m.m01 = m.m01 * v.x;
    m.m02 = m.m02 * v.x;
    m.m03 = m.m03 * v.x;
    m.m10 = m.m10 * v.y;
    m.m11 = m.m11 * v.y;
    m.m12 = m.m12 * v.y;
    m.m13 = m.m13 * v.y;
    m.m20 = m.m20 * v.z;
    m.m21 = m.m21 * v.z;
    m.m22 = m.m22 * v.z;
    m.m23 = m.m23 * v.z;
    return m;
}

  /**
   * Rotates a mat4 by the given angle around the given axis
   *
   * @param {number} rad the angle to rotate the matrix by
   * @param {vec3} axis the axis to rotate around
   * @returns {mat4} out
   */
  export function mat4Rotate(m: mat4, rad: number, axis: rvec3)
  {
    let x = axis.x,
      y = axis.y,
      z = axis.z;
    let len = Math.sqrt(x ** 2 + y ** 2 + z ** 2);

    if (len < mathf.EPSILON)
    {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const t = 1 - c;

    const a00 = m.m00,
      a01 = m.m01,
      a02 = m.m02,
      a03 = m.m03;
    const a10 = m.m10,
      a11 = m.m11,
      a12 = m.m12,
      a13 = m.m13;
    const a20 = m.m20,
      a21 = m.m21,
      a22 = m.m22,
      a23 = m.m23;

    // Construct the elements of the rotation matrix
    const b00 = x * x * t + c;
    const b01 = y * x * t + z * s;
    const b02 = z * x * t - y * s;
    const b10 = x * y * t - z * s;
    const b11 = y * y * t + c;
    const b12 = z * y * t + x * s;
    const b20 = x * z * t + y * s;
    const b21 = y * z * t - x * s;
    const b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    m.m00 = a00 * b00 + a10 * b01 + a20 * b02;
    m.m01 = a01 * b00 + a11 * b01 + a21 * b02;
    m.m02 = a02 * b00 + a12 * b01 + a22 * b02;
    m.m03 = a03 * b00 + a13 * b01 + a23 * b02;
    m.m10 = a00 * b10 + a10 * b11 + a20 * b12;
    m.m11 = a01 * b10 + a11 * b11 + a21 * b12;
    m.m12 = a02 * b10 + a12 * b11 + a22 * b12;
    m.m13 = a03 * b10 + a13 * b11 + a23 * b12;
    m.m20 = a00 * b20 + a10 * b21 + a20 * b22;
    m.m21 = a01 * b20 + a11 * b21 + a21 * b22;
    m.m22 = a02 * b20 + a12 * b21 + a22 * b22;
    m.m23 = a03 * b20 + a13 * b21 + a23 * b22;

    return m;
  }

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
export function mat4RotateX(m: mat4, rad: number)
{
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const a10 = m.m10,
      a11 = m.m11,
      a12 = m.m12,
      a13 = m.m13;
    const a20 = m.m20,
      a21 = m.m21,
      a22 = m.m22,
      a23 = m.m23;

    m.m10 = a10 * c + a20 * s;
    m.m11 = a11 * c + a21 * s;
    m.m12 = a12 * c + a22 * s;
    m.m13 = a13 * c + a23 * s;
    m.m20 = a20 * c - a10 * s;
    m.m21 = a21 * c - a11 * s;
    m.m22 = a22 * c - a12 * s;
    m.m23 = a23 * c - a13 * s;
    return m;
}

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
export function mat4RotateY(m: mat4, rad: number)
{
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const a00 = m.m00,
      a01 = m.m01,
      a02 = m.m02,
      a03 = m.m03;
    const a20 = m.m20,
      a21 = m.m21,
      a22 = m.m22,
      a23 = m.m23;

    // Perform axis-specific matrix multiplication
    m.m00 = a00 * c - a20 * s;
    m.m01 = a01 * c - a21 * s;
    m.m02 = a02 * c - a22 * s;
    m.m03 = a03 * c - a23 * s;
    m.m20 = a00 * s + a20 * c;
    m.m21 = a01 * s + a21 * c;
    m.m22 = a02 * s + a22 * c;
    m.m23 = a03 * s + a23 * c;
    return m;
}

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
export function mat4RotateZ(m: mat4, rad: number)
{
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const a00 = m.m00,
      a01 = m.m01,
      a02 = m.m02,
      a03 = m.m03;
    const a10 = m.m10,
      a11 = m.m11,
      a12 = m.m12,
      a13 = m.m13;

    // Perform axis-specific matrix multiplication
    m.m00 = a00 * c + a10 * s;
    m.m01 = a01 * c + a11 * s;
    m.m02 = a02 * c + a12 * s;
    m.m03 = a03 * c + a13 * s;
    m.m10 = a10 * c - a00 * s;
    m.m11 = a11 * c - a01 * s;
    m.m12 = a12 * c - a02 * s;
    m.m13 = a13 * c - a03 * s;
    return m;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
export function mat4SetFromTranslation(m: mat4, v: rvec3)
{
    m.m00 = 1;
    m.m01 = 0;
    m.m02 = 0;
    m.m03 = 0;
    m.m10 = 0;
    m.m11 = 1;
    m.m12 = 0;
    m.m13 = 0;
    m.m20 = 0;
    m.m21 = 0;
    m.m22 = 1;
    m.m23 = 0;
    m.m30 = v.x;
    m.m31 = v.y;
    m.m32 = v.z;
    m.m33 = 1;
    return m;
}

export function mat4FromTranslation(v: rvec3): mat4
{
    return {
        m00: 1, m01: 0, m02: 0, m03: 0,
        m10: 0, m11: 1, m12: 0, m13: 0,
        m20: 0, m21: 0, m22: 1, m23: 0,
        m30: v.x, m31: v.y, m32: v.z, m33: 1
    }
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
export function mat4SetFromScaling(m: mat4, v: rvec3)
{
    m.m00 = v.x;
    m.m01 = 0;
    m.m02 = 0;
    m.m03 = 0;
    m.m10 = 0;
    m.m11 = v.y;
    m.m12 = 0;
    m.m13 = 0;
    m.m20 = 0;
    m.m21 = 0;
    m.m22 = v.z;
    m.m23 = 0;
    m.m30 = 0;
    m.m31 = 0;
    m.m32 = 0;
    m.m33 = 1;
    return m;
}

export function mat4FromScaling(v: rvec3): mat4
{
    return {
        m00: v.x, m01: 0, m02: 0, m03: 0,
        m10: 0, m11: v.y, m12: 0, m13: 0,
        m20: 0, m21: 0, m22: v.z, m23: 0,
        m30: 0, m31: 0, m32: 0, m33: 1
    }
}

  /**
   * Creates a matrix from a given angle around a given axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotate(dest, dest, rad, axis);
   *
   * @param {number} rad the angle to rotate the matrix by
   * @param {vec3} axis the axis to rotate around
   * @returns {mat4} out
   */
  export function mat4SetFromRotation(m: mat4, rad: number, axis: rvec3)
  {
    let x = axis.x,
      y = axis.y,
      z = axis.z;
    let len = Math.sqrt(x ** 2 + y ** 2 + z ** 2);

    if (len < mathf.EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const t = 1 - c;

    // Perform rotation-specific matrix multiplication
    m.m00 = x * x * t + c;
    m.m01 = y * x * t + z * s;
    m.m02 = z * x * t - y * s;
    m.m03 = 0;
    m.m10 = x * y * t - z * s;
    m.m11 = y * y * t + c;
    m.m12 = z * y * t + x * s;
    m.m13 = 0;
    m.m20 = x * z * t + y * s;
    m.m21 = y * z * t - x * s;
    m.m22 = z * z * t + c;
    m.m23 = 0;
    m.m30 = 0;
    m.m31 = 0;
    m.m32 = 0;
    m.m33 = 1;
    return this;
  }

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 * @param {number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
export function mat4SetFromXRotation(m: mat4, rad: number)
{
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    m.m00 = 1;
    m.m01 = 0;
    m.m02 = 0;
    m.m03 = 0;
    m.m10 = 0;
    m.m11 = c;
    m.m12 = s;
    m.m13 = 0;
    m.m20 = 0;
    m.m21 = -s;
    m.m22 = c;
    m.m23 = 0;
    m.m30 = 0;
    m.m31 = 0;
    m.m32 = 0;
    m.m33 = 1;
    return m;
}

  /**
   * Creates a matrix from the given angle around the Y axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateY(dest, dest, rad);
   * @param {number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */
  export function mat4SetFromYRotation(m: mat4, rad: number)
  {
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    m.m00 = c;
    m.m01 = 0;
    m.m02 = -s;
    m.m03 = 0;
    m.m10 = 0;
    m.m11 = 1;
    m.m12 = 0;
    m.m13 = 0;
    m.m20 = s;
    m.m21 = 0;
    m.m22 = c;
    m.m23 = 0;
    m.m30 = 0;
    m.m31 = 0;
    m.m32 = 0;
    m.m33 = 1;
    return m;
  }

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 * @param {number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
export function mat4SetFromZRotation(m: mat4, rad: number)
{
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    m.m00 = c;
    m.m01 = s;
    m.m02 = 0;
    m.m03 = 0;
    m.m10 = -s;
    m.m11 = c;
    m.m12 = 0;
    m.m13 = 0;
    m.m20 = 0;
    m.m21 = 0;
    m.m22 = 1;
    m.m23 = 0;
    m.m30 = 0;
    m.m31 = 0;
    m.m32 = 0;
    m.m33 = 1;
    return m;
}

  /**
   * Creates a matrix from a quaternion rotation and vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   * @param {quat4} q Rotation quaternion
   * @param {vec3} v Translation vector
   * @returns {mat4} out
   */
  export function mat4SetFromRotationTranslation(m: mat4, q: rquat, v: rvec3)
  {
    // Quaternion math
    const x = q.x,
      y = q.y,
      z = q.z,
      w = q.w;

    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;

    const xx = x * x2;
    const xy = x * y2;
    const xz = x * z2;
    const yy = y * y2;
    const yz = y * z2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;

    m.m00 = 1 - (yy + zz);
    m.m01 = xy + wz;
    m.m02 = xz - wy;
    m.m03 = 0;
    m.m10 = xy - wz;
    m.m11 = 1 - (xx + zz);
    m.m12 = yz + wx;
    m.m13 = 0;
    m.m20 = xz + wy;
    m.m21 = yz - wx;
    m.m22 = 1 - (xx + yy);
    m.m23 = 0;
    m.m30 = v.x;
    m.m31 = v.y;
    m.m32 = v.z;
    m.m33 = 1;

    return this;
  }
  /**
   * Returns the translation vector component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslation,
   *  the returned vector will be the same as the translation vector
   *  originally supplied.
   * @return {vec3} out
   */
  export function mat4GetTranslation(m: rmat4, out: vec3)
  {
    out.x = m.m30;
    out.y = m.m31;
    out.z = m.m32;
    return out;
  }

/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @return {vec3} out
 */
export function mat4GetScaling(m: rmat4, out: vec3)
{
    out.x = Math.sqrt(m.m11 ** 2 + m.m12 ** 2 + m.m13 ** 2),
    out.y = Math.sqrt(m.m21 ** 2 + m.m22 ** 2 + m.m23 ** 2),
    out.z = Math.sqrt(m.m31 ** 2 + m.m32 ** 2 + m.m33 ** 2)
    return  out;
}

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @return {quat} out
 */
export function mat4GetRotation(m: rmat4, out: quat)
{
    const scaling = mat4GetScaling(m, vec3Zero());

    const is1 = 1 / scaling.x;
    const is2 = 1 / scaling.y;
    const is3 = 1 / scaling.z;

    const sm11 = m.m00 * is1;
    const sm12 = m.m01 * is2;
    const sm13 = m.m02 * is3;
    const sm21 = m.m10 * is1;
    const sm22 = m.m11 * is2;
    const sm23 = m.m12 * is3;
    const sm31 = m.m20 * is1;
    const sm32 = m.m21 * is2;
    const sm33 = m.m22 * is3;

    const trace = sm11 + sm22 + sm33;
    if (trace > 0)
    {
        const S = Math.sqrt(trace + 1.0) * 2;
        out.w = 0.25 * S;
        out.x = (sm23 - sm32) / S;
        out.y = (sm31 - sm13) / S;
        out.z = (sm12 - sm21) / S;
    }
    else if (sm11 > sm22 && sm11 > sm33)
    {
        const S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
        out.w = (sm23 - sm32) / S;
        out.x = 0.25 * S;
        out.y = (sm12 + sm21) / S;
        out.z = (sm31 + sm13) / S;
        }
    else if (sm22 > sm33)
    {
        const S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
        out.w = (sm31 - sm13) / S;
        out.x = (sm12 + sm21) / S;
        out.y = 0.25 * S;
        out.z = (sm23 + sm32) / S;
    }
    else
    {
        const S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
        out.w = (sm12 - sm21) / S;
        out.x = (sm31 + sm13) / S;
        out.y = (sm23 + sm32) / S;
        out.z = 0.25 * S;
    }

    return out;
}

/**
 * Decomposes a transformation matrix into its rotation, translation
 * and scale components. Returns only the rotation component
 * @param  {quat} q Quaternion to receive the rotation component
 * @param  {vec3} t Vector to receive the translation vector
 * @param  {vec3} s Vector to receive the scaling factor
 * @returns {quat} out_r
 */
export function mat4Decompose(m: rmat4, q: quat, t: vec3, s: vec3): rmat4
{
    t.x = m.m30;
    t.y = m.m31;
    t.z = m.m32;

    s.x = Math.sqrt(m.m00 ** 2 + m.m01 ** 2 + m.m02 ** 2);
    s.y = Math.sqrt(m.m10 ** 2 + m.m11 ** 2 + m.m12 ** 2);
    s.z = Math.sqrt(m.m20 ** 2 + m.m21 ** 2 + m.m22 ** 2);

    const is1 = 1 / s.x;
    const is2 = 1 / s.y;
    const is3 = 1 / s.z;

    const sm11 = m.m00 * is1;
    const sm12 = m.m01 * is2;
    const sm13 = m.m02 * is3;
    const sm21 = m.m10 * is1;
    const sm22 = m.m11 * is2;
    const sm23 = m.m12 * is3;
    const sm31 = m.m20 * is1;
    const sm32 = m.m21 * is2;
    const sm33 = m.m22 * is3;

    const trace = sm11 + sm22 + sm33;

    if (trace > 0)
    {
        const S = Math.sqrt(trace + 1.0) * 2;
        q.w = 0.25 * S;
        q.x = (sm23 - sm32) / S;
        q.y = (sm31 - sm13) / S;
        q.z = (sm12 - sm21) / S;
    }
    else if (sm11 > sm22 && sm11 > sm33)
    {
        const S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
        q.w = (sm23 - sm32) / S;
        q.x = 0.25 * S;
        q.y = (sm12 + sm21) / S;
        q.z = (sm31 + sm13) / S;
    }
    else if (sm22 > sm33)
    {
        const S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
        q.w = (sm31 - sm13) / S;
        q.x = (sm12 + sm21) / S;
        q.y = 0.25 * S;
        q.z = (sm23 + sm32) / S;
    }
    else
    {
        const S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
        q.w = (sm12 - sm21) / S;
        q.x = (sm31 + sm13) / S;
        q.y = (sm23 + sm32) / S;
        q.z = 0.25 * S;
    }
    return m;
  }

  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   * @param {quat4} q Rotation quaternion
   * @param {vec3} v Translation vector
   * @param {vec3} s Scaling vector
   * @returns {mat4} out
   */
  export function mat4SetFromRotationTranslationScale(m: mat4, q: rquat, v: rvec3, s: rvec3)
  {
    // Quaternion math
    const x2 = q.x + q.x;
    const y2 = q.y + q.y;
    const z2 = q.z + q.z;

    const xx = q.x * x2;
    const xy = q.x * y2;
    const xz = q.x * z2;
    const yy = q.y * y2;
    const yz = q.y * z2;
    const zz = q.z * z2;
    const wx = q.w * x2;
    const wy = q.w * y2;
    const wz = q.w * z2;

    m.m00 = (1 - (yy + zz)) * s.x;
    m.m01 = (xy + wz) * s.x;
    m.m02 = (xz - wy) * s.x;
    m.m03 = 0;
    m.m10 = (xy - wz) * s.y;
    m.m11 = (1 - (xx + zz)) * s.y;
    m.m12 = (yz + wx) * s.y;
    m.m13 = 0;
    m.m20 = (xz + wy) * s.z;
    m.m21 = (yz - wx) * s.z;
    m.m22 = (1 - (xx + yy)) * s.z;
    m.m23 = 0;
    m.m30 = v.x;
    m.m31 = v.y;
    m.m32 = v.z;
    m.m33 = 1;

    return m;
  }

  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     mat4.translate(dest, origin);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   *     mat4.translate(dest, negativeOrigin);
   * @param {quat4} q Rotation quaternion
   * @param {vec3} v Translation vector
   * @param {vec3} s Scaling vector
   * @param {vec3} o The origin vector around which to scale and rotate
   * @returns {mat4} out
   */
  export function mat4SetFromRotationTranslationScaleOrigin(m: mat4, q: rquat, v: rvec3, s: rvec3, o: rvec3)
  {
    // Quaternion math
    const x2 = q.x + q.x;
    const y2 = q.y + q.y;
    const z2 = q.z + q.z;

    const xx = q.x * x2;
    const xy = q.x * y2;
    const xz = q.x * z2;
    const yy = q.y * y2;
    const yz = q.y * z2;
    const zz = q.z * z2;
    const wx = q.w * x2;
    const wy = q.w * y2;
    const wz = q.w * z2;

    const out0 = (1 - (yy + zz)) * s.x;
    const out1 = (xy + wz) * s.x;
    const out2 = (xz - wy) * s.x;
    const out4 = (xy - wz) * s.y;
    const out5 = (1 - (xx + zz)) * s.y;
    const out6 = (yz + wx) * s.y;
    const out8 = (xz + wy) * s.z;
    const out9 = (yz - wx) * s.z;
    const out10 = (1 - (xx + yy)) * s.z;

    m.m00 = out0;
    m.m01 = out1;
    m.m02 = out2;
    m.m03 = 0;
    m.m10 = out4;
    m.m11 = out5;
    m.m12 = out6;
    m.m13 = 0;
    m.m20 = out8;
    m.m21 = out9;
    m.m22 = out10;
    m.m23 = 0;
    m.m30 = v.x + o.x - (out0 * o.x + out4 * o.y + out8 * o.z);
    m.m31 = v.y + o.y - (out1 * o.x + out5 * o.y + out9 * o.z);
    m.m32 = v.z + o.z - (out2 * o.x + out6 * o.y + out10 * o.z);
    m.m33 = 1;

    return m;
  }

  /**
   * Calculates a 4x4 matrix from the given quaternion
   * @param {ReadonlyQuat} q Quaternion to create matrix from
   * @returns {mat4} out
   */
  export function mat4SetFromQuat(m: mat4, q: rquat)
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
    m.m01 = yx + wz;
    m.m02 = zx - wy;
    m.m03 = 0;

    m.m10 = yx - wz;
    m.m11 = 1 - xx - zz;
    m.m12 = zy + wx;
    m.m13 = 0;

    m.m20 = zx + wy;
    m.m21 = zy - wx;
    m.m22 = 1 - xx - yy;
    m.m23 = 0;

    m.m30 = 0;
    m.m31 = 0;
    m.m32 = 0;
    m.m33 = 1;

    return m;
  }

  /**
   * Generates a frustum matrix with the given bounds
   *
   * @param {number} left Left bound of the frustum
   * @param {number} right Right bound of the frustum
   * @param {number} bottom Bottom bound of the frustum
   * @param {number} top Top bound of the frustum
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */
  export function mat4SetFrustum(m: mat4, left: number, right: number, bottom: number, top: number, near: number, far: number)
  {
    const rl = 1 / (right - left);
    const tb = 1 / (top - bottom);
    const nf = 1 / (near - far);
    m.m00 = near * 2 * rl;
    m.m01 = 0;
    m.m02 = 0;
    m.m03 = 0;
    m.m10 = 0;
    m.m11 = near * 2 * tb;
    m.m12 = 0;
    m.m13 = 0;
    m.m20 = (right + left) * rl;
    m.m21 = (top + bottom) * tb;
    m.m22 = (far + near) * nf;
    m.m23 = -1;
    m.m30 = 0;
    m.m31 = 0;
    m.m32 = far * near * 2 * nf;
    m.m33 = 0;
    return m;
  }

/**
 * Generates a perspective projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */
export function mat4SetPerspectiveNO(m: mat4, fovy: number, aspect: number, near: number, far: number)
{
    const f = 1.0 / Math.tan(fovy / 2);
    m.m00 = f / aspect;
    m.m01 = 0;
    m.m02 = 0;
    m.m03 = 0;
    m.m10 = 0;
    m.m11 = f;
    m.m12 = 0;
    m.m13 = 0;
    m.m20 = 0;
    m.m21 = 0;
    m.m23 = -1;
    m.m30 = 0;
    m.m31 = 0;
    m.m33 = 0;

    if (far != null && far !== Infinity)
    {
        const nf = 1 / (near - far);
        m.m22 = (far + near) * nf;
        m.m32 = 2 * far * near * nf;
    }
    else
    {
        m.m22 = -1;
        m.m32 = -2 * near;
    }
    return m;
}

/**
 * Generates a perspective projection matrix suitable for WebGPU with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
 * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */
export function mat4SetPerspectiveZO(m: mat4, fovy: number, aspect: number, near: number, far: number)
{
    const f = 1.0 / Math.tan(fovy / 2);
    m.m00 = f / aspect;
    m.m01 = 0;
    m.m02 = 0;
    m.m03 = 0;
    m.m10 = 0;
    m.m11 = f;
    m.m12 = 0;
    m.m13 = 0;
    m.m20 = 0;
    m.m21 = 0;
    m.m23 = -1;
    m.m30 = 0;
    m.m31 = 0;
    m.m33 = 0;

    if (far != null && far !== Infinity)
    {
        const nf = 1 / (near - far);
        m.m22 = far * nf;
        m.m32 = far * near * nf;
    }
    else
    {
        m.m22 = -1;
        m.m32 = -near;
    }
    return m;
}

export interface FieldOfViewVR
{
    upDegrees: number;
    downDegrees: number;
    leftDegrees: number;
    rightDegrees: number;
}

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experimental WebVR API.
 *
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
export function mat4SetPerspectiveFromFieldOfView(m: mat4, fov: Readonly<FieldOfViewVR>, near: number, far: number)
{
    const upTan = Math.tan((fov.upDegrees * Math.PI) / 180.0);
    const downTan = Math.tan((fov.downDegrees * Math.PI) / 180.0);
    const leftTan = Math.tan((fov.leftDegrees * Math.PI) / 180.0);
    const rightTan = Math.tan((fov.rightDegrees * Math.PI) / 180.0);
    const xScale = 2.0 / (leftTan + rightTan);
    const yScale = 2.0 / (upTan + downTan);

    m.m00 = xScale;
    m.m01 = 0.0;
    m.m02 = 0.0;
    m.m03 = 0.0;
    m.m10 = 0.0;
    m.m11 = yScale;
    m.m12 = 0.0;
    m.m13 = 0.0;
    m.m20 = -((leftTan - rightTan) * xScale * 0.5);
    m.m21 = (upTan - downTan) * yScale * 0.5;
    m.m22 = far / (near - far);
    m.m23 = -1.0;
    m.m30 = 0.0;
    m.m31 = 0.0;
    m.m32 = (far * near) / (near - far);
    m.m33 = 0.0;

    return m;
}

/**
 * Generates a orthogonal projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 *
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
export function mat4SetOrthoNO(m: mat4, left: number, right: number, bottom: number, top: number, near: number, far: number)
{
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);

    m.m00 = -2 * lr;
    m.m01 = 0;
    m.m02 = 0;
    m.m03 = 0;
    m.m10 = 0;
    m.m11 = -2 * bt;
    m.m12 = 0;
    m.m13 = 0;
    m.m20 = 0;
    m.m21 = 0;
    m.m22 = 2 * nf;
    m.m23 = 0;
    m.m30 = (left + right) * lr;
    m.m31 = (top + bottom) * bt;
    m.m32 = (far + near) * nf;
    m.m33 = 1;

    return this;
}

/**
 * Generates a orthogonal projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
 * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
 *
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
export function mat4SetOrthoZO(m: mat4, left: number, right: number, bottom: number, top: number, near: number, far: number)
{
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);

    m.m00 = -2 * lr;
    m.m01 = 0;
    m.m02 = 0;
    m.m03 = 0;
    m.m10 = 0;
    m.m11 = -2 * bt;
    m.m12 = 0;
    m.m13 = 0;
    m.m20 = 0;
    m.m21 = 0;
    m.m22 = nf;
    m.m23 = 0;
    m.m30 = (left + right) * lr;
    m.m31 = (top + bottom) * bt;
    m.m32 = near * nf;
    m.m33 = 1;

    return m;
}

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
export function mat4SetLookAt(m: mat4, eye: rvec3, center: rvec3, up: rvec3)
{
    let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;

    if (
      Math.abs(eye.x - center.x) < mathf.EPSILON &&
      Math.abs(eye.y - center.y) < mathf.EPSILON &&
      Math.abs(eye.z - center.z) < mathf.EPSILON
    )
    {
        return this.identity();
    }

    z0 = eye.x - center.x;
    z1 = eye.y - center.y;
    z2 = eye.z - center.z;

    len = 1 / Math.hypot(z0, z1, z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = up.y * z2 - up.z * z1;
    x1 = up.z * z0 - up.x * z2;
    x2 = up.x * z1 - up.y * z0;
    len = Math.hypot(x0, x1, x2);
    if (!len)
    {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    }
    else
    {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.hypot(y0, y1, y2);
    if (!len)
    {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    }
    else
    {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    m.m00 = x0;
    m.m01 = y0;
    m.m02 = z0;
    m.m03 = 0;
    m.m10 = x1;
    m.m11 = y1;
    m.m12 = z1;
    m.m13 = 0;
    m.m20 = x2;
    m.m21 = y2;
    m.m22 = z2;
    m.m23 = 0;
    m.m30 = -(x0 * eye.x + x1 * eye.y + x2 * eye.z);
    m.m31 = -(y0 * eye.x + y1 * eye.y + y2 * eye.z);
    m.m32 = -(z0 * eye.x + z1 * eye.y + z2 * eye.z);
    m.m33 = 1;

    return m;
}

/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
export function mat4SetTargetTo(m: mat4, eye: rvec3, center: rvec3, up: rvec3)
{
    let z0 = eye.x - center.x,
      z1 = eye.y - center.y,
      z2 = eye.z - center.z;

    let len = z0 * z0 + z1 * z1 + z2 * z2;
    if (len > 0)
    {
        len = 1 / Math.sqrt(len);
        z0 *= len;
        z1 *= len;
        z2 *= len;
    }

    let x0 = up.y * z2 - up.z * z1,
      x1 = up.z * z0 - up.x * z2,
      x2 = up.x * z1 - up.y * z0;

    len = x0 * x0 + x1 * x1 + x2 * x2;
    if (len > 0)
    {
        len = 1 / Math.sqrt(len);
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    m.m00 = x0;
    m.m01 = x1;
    m.m02 = x2;
    m.m03 = 0;
    m.m10 = z1 * x2 - z2 * x1;
    m.m11 = z2 * x0 - z0 * x2;
    m.m12 = z0 * x1 - z1 * x0;
    m.m13 = 0;
    m.m20 = z0;
    m.m21 = z1;
    m.m22 = z2;
    m.m23 = 0;
    m.m30 = eye.x;
    m.m31 = eye.y;
    m.m32 = eye.z;
    m.m33 = 1;
    return m;
}

  /**
   * Returns Frobenius norm of a mat4
   *
   * @returns {number} Frobenius norm
   */
  export function mat4Frob(m: rmat4)
  {
    return Math.hypot(
        m.m00, m.m01, m.m02, m.m03,
        m.m10, m.m11, m.m12, m.m13,
        m.m20, m.m21, m.m22, m.m23,
        m.m30, m.m31, m.m32, m.m33
    );
  }

/**
 * Adds two mat4's
 * @param {mat4} left the second operand
 * @returns {mat4} out
 */
export function mat4Add(left: mat4, right: rmat4)
{
    left.m00 += right.m00;
    left.m01 += right.m01;
    left.m02 += right.m02;
    left.m03 += right.m03;
    left.m10 += right.m10;
    left.m11 += right.m11;
    left.m12 += right.m12;
    left.m13 += right.m13;
    left.m20 += right.m20;
    left.m21 += right.m21;
    left.m22 += right.m22;
    left.m23 += right.m23;
    left.m30 += right.m30;
    left.m31 += right.m31;
    left.m32 += right.m32;
    left.m33 += right.m33;
    return left;
}

  /**
   * Subtracts matrix b from matrix a
   * @param {mat4} matrix the second operand
   * @returns {mat4} out
   */
  export function mat4Sub(left: mat4, right: rmat4)
  {
    left.m00 -= right.m00;
    left.m01 -= right.m01;
    left.m02 -= right.m02;
    left.m03 -= right.m03;
    left.m10 -= right.m10;
    left.m11 -= right.m11;
    left.m12 -= right.m12;
    left.m13 -= right.m13;
    left.m20 -= right.m20;
    left.m21 -= right.m21;
    left.m22 -= right.m22;
    left.m23 -= right.m23;
    left.m30 -= right.m30;
    left.m31 -= right.m31;
    left.m32 -= right.m32;
    left.m33 -= right.m33;
    return left;
  }

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {number} s amount to scale the matrix's elements by
 * @returns {mat4} out
 */
export function mat4MulScalar(m: mat4, s: number)
{
    m.m00 *= s;
    m.m01 *= s;
    m.m02 *= s;
    m.m03 *= s;
    m.m10 *= s;
    m.m11 *= s;
    m.m12 *= s;
    m.m13 *= s;
    m.m20 *= s;
    m.m21 *= s;
    m.m22 *= s;
    m.m23 *= s;
    m.m30 *= s;
    m.m31 *= s;
    m.m32 *= s;
    m.m33 *= s;
    return m;
}