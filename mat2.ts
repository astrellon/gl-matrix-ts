import { rvec2 } from "./vec2";

export interface mat2
{
    m00: number;
    m01: number;
    m10: number;
    m11: number;
}

export type rmat2 = Readonly<mat2>;

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param m matrix to clone
 * @returns a new matrix
 */
export function mat2Clone(m: rmat2): mat2
{
    return {
        m00: m.m00, m01: m.m01,
        m10: m.m10, m11: m.m11,
    }
}

/**
 * Copy the values from one mat2 to another
 *
 * @param left the left matrix
 * @param right the right matrix
 * @returns the left matrix
 */
export function mat2Copy(left: mat2, right: rmat2): mat2
{
    left.m00 = right.m00;
    left.m01 = right.m01;
    left.m10 = right.m10;
    left.m11 = right.m11;

    return left;
}

/**
 * Creates an identity matrix
 *
 * @returns a new identity matrix
 */
export function mat2Identity(): mat2
{
    return {
        m00: 1, m01: 0,
        m10: 0, m11: 1,
    }
}

/**
 * Set the components of a mat2 to the given values
 *
 * @param m the target matrix
 * @param m00 Component in column 0, row 0 position (index 0)
 * @param m01 Component in column 0, row 1 position (index 1)
 * @param m10 Component in column 1, row 0 position (index 2)
 * @param m11 Component in column 1, row 1 position (index 3)
 * @returns the target matrix
 */
export function mat2Set(
    m: mat2,
    m00: number,
    m01: number,
    m10: number,
    m11: number)
{
    m.m00 = m00;
    m.m01 = m01;
    m.m10 = m10;
    m.m11 = m11;

    return m;
}

/**
 * Transpose the values of a mat2
 * @param m the target matrix
 * @returns the target matrix
 */
export function mat2Transpose(m: mat2)
{
    const a1 = m.m01;
    m.m01 = m.m10;
    m.m10 = a1;

    return m;
}

/**
 * Inverts a mat2
 *
 * @param m the target matrix
 * @returns the target matrix
 */
export function mat2Invert(m: mat2)
{
    const a0 = m.m00,
      a1 = m.m01,
      a2 = m.m10,
      a3 = m.m11;

    // Calculate the determinant
    let det = a0 * a3 - a2 * a1;

    if (!det)
    {
      return null;
    }
    det = 1.0 / det;

    m.m00 = a3 * det;
    m.m01 = -a1 * det;
    m.m10 = -a2 * det;
    m.m11 = a0 * det;

    return m;
}

/**
 * Calculates the adjugate of a mat2
 *
 * @param m the target matrix
 * @returns the target matrix
 */
export function mat2Adjoint(m: mat2)
{
    // Caching this value is necessary if data == a
    const a0 = m.m00;

    m.m00 = m.m11;
    m.m01 = -m.m01;
    m.m10 = -m.m10;
    m.m11 = a0;

    return m;
}

/**
 * Calculates the determinant of a mat2
 *
 * @param m the target matrix
 * @returns determinant of a
 */
export function mat2Determinant(m: rmat2)
{
    return m.m00 * m.m11 - m.m10 * m.m01;
}

/**
 * Multiplies two mat2's
 *
 * @param left the left matrix
 * @param right the right matrix
 * @returns the left matrix
 */
export function mat2Mul(left: mat2, right: rmat2)
{
    const a0 = left.m00,
      a1 = left.m01,
      a2 = left.m10,
      a3 = left.m11;

    left.m00 = a0 * right.m00 + a2 * right.m01;
    left.m01 = a1 * right.m00 + a3 * right.m01;
    left.m10 = a0 * right.m10 + a2 * right.m11;
    left.m11 = a1 * right.m10 + a3 * right.m11;

    return left;
}

/**
 * Rotates a mat2 by the given angle
 *
 * @param m the target matrix
 * @param rad the angle to rotate the matrix by
 * @returns the matrix matrix
 */
export function mat2Rotate(m: mat2, rad:number)
{
    const a0 = m.m00,
      a1 = m.m01,
      a2 = m.m10,
      a3 = m.m11;

    const s = Math.sin(rad);
    const c = Math.cos(rad);

    m.m00 = a0 * c + a2 * s;
    m.m01 = a1 * c + a3 * s;
    m.m10 = a0 * -s + a2 * c;
    m.m11 = a1 * -s + a3 * c;

    return m;
}

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param m the target matrix
 * @param v the vec2 to scale the matrix by
 * @returns the target matrix
 */
export function mat2Scale(m: mat2, v: rvec2)
{
    const a0 = m.m00,
      a1 = m.m01,
      a2 = m.m10,
      a3 = m.m11;

    m.m00 = a0 * v.x;
    m.m01 = a1 * v.x;
    m.m10 = a2 * v.y;
    m.m11 = a3 * v.y;

    return m;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param m the target matrix
 * @param rad the angle to rotate the matrix by
 * @returns the target matrix
 */
export function mat2SetFromRotation(m: mat2, rad:number)
{
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    m.m00 = c;
    m.m01 = s;
    m.m10 = -s;
    m.m11 = c;

    return m;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param m the target matrix
 * @param v Scaling vector
 * @returns the target matrix
 */
export function mat2SetFromScaling(m: mat2, v: rvec2)
{
    m.m00 = v.x;
    m.m01 = 0;
    m.m10 = 0;
    m.m11 = v.y;

    return m;
}

/**
 * Returns Frobenius norm of a mat2
 *
 * @param m the target matrix
 * @returns the Frobenius norm
 */
export function mat2Frob(m: rmat2)
{
    return Math.sqrt(m.m00 ** 2 +
        m.m01 ** 2 +
        m.m10 ** 2 +
        m.m11 ** 2);
}

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 *
 * @param l the lower triangular matrix
 * @param d the diagonal matrix
 * @param u the upper triangular matrix
 * @param a the input matrix to factorize
 * @returns a list containing [L, D, U]
 */
export function mat2LDU(l: mat2, d: mat2, u: mat2, a: rmat2)
{
    l.m10 = a.m10 / a.m00;
    u.m00 = a.m00;
    u.m01 = a.m01;
    u.m11 = a.m11 - l.m10 * u.m01;
    return [l, d, u];
}

/**
 * Adds two mat2's
 *
 * @param left the left matrix
 * @param right the right matrix
 * @returns the left matrix
 */
export function mat2Add(left: mat2, right: rmat2)
{
    left.m00 += right.m00;
    left.m01 += right.m01;
    left.m10 += right.m10;
    left.m11 += right.m11;

    return left;
}

/**
 * Subtracts matrix left -= right
 * @param left the left matrix
 * @param right the right matrix
 * @returns the left matrix
 */
export function mat2Sub(left: mat2, right: rmat2)
{
    left.m00 -= right.m00;
    left.m01 -= right.m01;
    left.m10 -= right.m10;
    left.m11 -= right.m11;

    return left;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param m the target matrix
 * @param s amount to scale the matrix's elements by
 * @returns the target matrix
 */
export function mat2MulScalar(m: mat2, s:number)
{
    m.m00 *= s;
    m.m01 *= s;
    m.m10 *= s;
    m.m11 *= s;

    return m;
}