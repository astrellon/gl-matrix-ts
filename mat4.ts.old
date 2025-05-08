import mathf from "./mathf";
import quat from "./quat";
import vec3 from "./vec3";

/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

interface mat4_2
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

function invert2(data: mat4_2) {
    let a00 = data.m00,
        a01 = data.m01,
        a02 = data.m02,
        a03 = data.m03;
    let a10 = data.m10,
        a11 = data.m11,
        a12 = data.m12,
        a13 = data.m13;
    let a20 = data.m20,
        a21 = data.m21,
        a22 = data.m22,
        a23 = data.m23;
    let a30 = data.m30,
        a31 = data.m31,
        a32 = data.m32,
        a33 = data.m33;

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

    data.m00 = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    data.m01 = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    data.m02 = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    data.m03 = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    data.m10 = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    data.m11 = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    data.m12 = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    data.m13 = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    data.m20 = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    data.m21 = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    data.m22 = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    data.m23 = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    data.m30 = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    data.m31 = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    data.m32 = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    data.m33 = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return this;
}

export default class mat4 {
  private static readonly _identity = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

  data: Float32Array;
  /**
   * Creates a new identity mat4
   *
   * @returns {mat4} a new 4x4 matrix
   */
  constructor(data?: ArrayLike<number>) {
    if (data == null) {
      this.data = new Float32Array(mat4._identity);
    } else {
      this.data = new Float32Array(data);
    }
  }

  /**
   * Creates a new mat4 initialized with values from an existing matrix
   *
   * @param {mat4} a matrix to clone
   * @returns {mat4} a new 4x4 matrix
   */
  clone() {
    return new mat4(this.data);
  }

  /**
   * Copy the values from one mat4 to another
   * @returns {mat4} out
   */
  copy(a: mat4) {
    this.data.set(a.data);
    return this;
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
  set(
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
    m33: number
  ) {
    const data=this.data
    data[0] = m00;
    data[1] = m01;
    data[2] = m02;
    data[3] = m03;
    data[4] = m10;
    data[5] = m11;
    data[6] = m12;
    data[7] = m13;
    data[8] = m20;
    data[9] = m21;
    data[10] = m22;
    data[11] = m23;
    data[12] = m30;
    data[13] = m31;
    data[14] = m32;
    data[15] = m33;
    return this;
  }

  /**
   * Set a mat4 to the identity matrix
   *
   * @returns {mat4} out
   */
  identity() {
    this.data.set(mat4._identity);
    return this;
  }

  /**
   * Transpose the values of a mat4
   *
   * @returns {mat4} out
   */
  transpose() {
    const data=this.data
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    const a01 = data[1],
      a02 = data[2],
      a03 = data[3];
    const a12 = data[6],
      a13 = data[7];
    const a23 = data[11];

    data[1] = data[4];
    data[2] = data[8];
    data[3] = data[12];
    data[4] = a01;
    data[6] = data[9];
    data[7] = data[13];
    data[8] = a02;
    data[9] = a12;
    data[11] = data[14];
    data[12] = a03;
    data[13] = a13;
    data[14] = a23;
    return this;
  }

  /**
   * Inverts a mat4
   *
   * @returns {mat4} out
   */
  invert() {
    const data=this.data
    let a00 = data[0],
      a01 = data[1],
      a02 = data[2],
      a03 = data[3];
    let a10 = data[4],
      a11 = data[5],
      a12 = data[6],
      a13 = data[7];
    let a20 = data[8],
      a21 = data[9],
      a22 = data[10],
      a23 = data[11];
    let a30 = data[12],
      a31 = data[13],
      a32 = data[14],
      a33 = data[15];

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

    data[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    data[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    data[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    data[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    data[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    data[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    data[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    data[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    data[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    data[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    data[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    data[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    data[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    data[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    data[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    data[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return this;
  }

  /**
   * Calculates the adjugate of a mat4
   *
   * @returns {mat4} out
   */
  adjoint() {
    const data=this.data
    const a00 = data[0],
      a01 = data[1],
      a02 = data[2],
      a03 = data[3];
    const a10 = data[4],
      a11 = data[5],
      a12 = data[6],
      a13 = data[7];
    const a20 = data[8],
      a21 = data[9],
      a22 = data[10],
      a23 = data[11];
    const a30 = data[12],
      a31 = data[13],
      a32 = data[14],
      a33 = data[15];

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

    data[0] = a11 * b11 - a12 * b10 + a13 * b09;
    data[1] = a02 * b10 - a01 * b11 - a03 * b09;
    data[2] = a31 * b05 - a32 * b04 + a33 * b03;
    data[3] = a22 * b04 - a21 * b05 - a23 * b03;
    data[4] = a12 * b08 - a10 * b11 - a13 * b07;
    data[5] = a00 * b11 - a02 * b08 + a03 * b07;
    data[6] = a32 * b02 - a30 * b05 - a33 * b01;
    data[7] = a20 * b05 - a22 * b02 + a23 * b01;
    data[8] = a10 * b10 - a11 * b08 + a13 * b06;
    data[9] = a01 * b08 - a00 * b10 - a03 * b06;
    data[10] = a30 * b04 - a31 * b02 + a33 * b00;
    data[11] = a21 * b02 - a20 * b04 - a23 * b00;
    data[12] = a11 * b07 - a10 * b09 - a12 * b06;
    data[13] = a00 * b09 - a01 * b07 + a02 * b06;
    data[14] = a31 * b01 - a30 * b03 - a32 * b00;
    data[15] = a20 * b03 - a21 * b01 + a22 * b00;
    return this;
  }

  /**
   * Calculates the determinant of a mat4
   *
   * @returns {number} determinant of a
   */
  determinant() {
    const data=this.data
    const a00 = data[0],
      a01 = data[1],
      a02 = data[2],
      a03 = data[3];
    const a10 = data[4],
      a11 = data[5],
      a12 = data[6],
      a13 = data[7];
    const a20 = data[8],
      a21 = data[9],
      a22 = data[10],
      a23 = data[11];
    const a30 = data[12],
      a31 = data[13],
      a32 = data[14],
      a33 = data[15];

    const b0 = a00 * a11 - a01 * a10;
    const b1 = a00 * a12 - a02 * a10;
    const b2 = a01 * a12 - a02 * a11;
    const b3 = a20 * a31 - a21 * a30;
    const b4 = a20 * a32 - a22 * a30;
    const b5 = a21 * a32 - a22 * a31;
    const b6 = a00 * b5 - a01 * b4 + a02 * b3;
    const b7 = a10 * b5 - a11 * b4 + a12 * b3;
    const b8 = a20 * b2 - a21 * b1 + a22 * b0;
    const b9 = a30 * b2 - a31 * b1 + a32 * b0;

    // Calculate the determinant
    return a13 * b6 - a03 * b7 + a33 * b8 - a23 * b9;
  }

  /**
   * Multiplies two mat4s
   *
   * @param {mat4} matrix the second operand
   * @returns {mat4} out
   */
  multiply(matrix: mat4) {
    const data=this.data
    const b=matrix.data;
    const a00 = data[0],
      a01 = data[1],
      a02 = data[2],
      a03 = data[3];
    const a10 = data[4],
      a11 = data[5],
      a12 = data[6],
      a13 = data[7];
    const a20 = data[8],
      a21 = data[9],
      a22 = data[10],
      a23 = data[11];
    const a30 = data[12],
      a31 = data[13],
      a32 = data[14],
      a33 = data[15];

    // Cache only the current line of the second matrix
    let b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
    data[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    data[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    data[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    data[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    data[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    data[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    data[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    data[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    data[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    data[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    data[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    data[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    data[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    data[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    data[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    data[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return this;
  }

  /**
   * Translate a mat4 by the given vector
   *
   * @param {vec3} vector vector to translate by
   * @returns {mat4} out
   */
  translate(vector: vec3) {
    const data=this.data
    const v=vector.data;
    const x = v[0],
      y = v[1],
      z = v[2];

    data[12] = data[0] * x + data[4] * y + data[8] * z + data[12];
    data[13] = data[1] * x + data[5] * y + data[9] * z + data[13];
    data[14] = data[2] * x + data[6] * y + data[10] * z + data[14];
    data[15] = data[3] * x + data[7] * y + data[11] * z + data[15];

    return this;
  }

  /**
   * Scales the mat4 by the dimensions in the given vec3 not using vectorization
   *
   * @param {vec3} vector the vec3 to scale the matrix by
   * @returns {mat4} out
   **/
  scale(vector: vec3) {
    const data=this.data
    const v=vector.data;
    let x = v[0],
      y = v[1],
      z = v[2];

    data[0] = data[0] * x;
    data[1] = data[1] * x;
    data[2] = data[2] * x;
    data[3] = data[3] * x;
    data[4] = data[4] * y;
    data[5] = data[5] * y;
    data[6] = data[6] * y;
    data[7] = data[7] * y;
    data[8] = data[8] * z;
    data[9] = data[9] * z;
    data[10] = data[10] * z;
    data[11] = data[11] * z;
    return this;
  }

  /**
   * Rotates a mat4 by the given angle around the given axis
   *
   * @param {number} rad the angle to rotate the matrix by
   * @param {vec3} axis the axis to rotate around
   * @returns {mat4} out
   */
  rotate(rad: number, axis: vec3) {
    const data=this.data
    const a=axis.data;
    let x = a[0],
      y = a[1],
      z = a[2];
    let len = Math.hypot(x, y, z);
    let s, c, t;
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;
    let b00, b01, b02;
    let b10, b11, b12;
    let b20, b21, b22;

    if (len < mathf.EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = data[0];
    a01 = data[1];
    a02 = data[2];
    a03 = data[3];
    a10 = data[4];
    a11 = data[5];
    a12 = data[6];
    a13 = data[7];
    a20 = data[8];
    a21 = data[9];
    a22 = data[10];
    a23 = data[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    data[0] = a00 * b00 + a10 * b01 + a20 * b02;
    data[1] = a01 * b00 + a11 * b01 + a21 * b02;
    data[2] = a02 * b00 + a12 * b01 + a22 * b02;
    data[3] = a03 * b00 + a13 * b01 + a23 * b02;
    data[4] = a00 * b10 + a10 * b11 + a20 * b12;
    data[5] = a01 * b10 + a11 * b11 + a21 * b12;
    data[6] = a02 * b10 + a12 * b11 + a22 * b12;
    data[7] = a03 * b10 + a13 * b11 + a23 * b12;
    data[8] = a00 * b20 + a10 * b21 + a20 * b22;
    data[9] = a01 * b20 + a11 * b21 + a21 * b22;
    data[10] = a02 * b20 + a12 * b21 + a22 * b22;
    data[11] = a03 * b20 + a13 * b21 + a23 * b22;
    return this;
  }

  /**
   * Rotates a matrix by the given angle around the X axis
   *
   * @param {number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */
  rotateX(rad: number) {
    const data=this.data
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const a10 = data[4];
    const a11 = data[5];
    const a12 = data[6];
    const a13 = data[7];
    const a20 = data[8];
    const a21 = data[9];
    const a22 = data[10];
    const a23 = data[11];
    data[4] = a10 * c + a20 * s;
    data[5] = a11 * c + a21 * s;
    data[6] = a12 * c + a22 * s;
    data[7] = a13 * c + a23 * s;
    data[8] = a20 * c - a10 * s;
    data[9] = a21 * c - a11 * s;
    data[10] = a22 * c - a12 * s;
    data[11] = a23 * c - a13 * s;
    return this;
  }

  /**
   * Rotates a matrix by the given angle around the Y axis
   *
   * @param {number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */
  rotateY(rad: number) {
    const data=this.data
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const a00 = data[0];
    const a01 = data[1];
    const a02 = data[2];
    const a03 = data[3];
    const a20 = data[8];
    const a21 = data[9];
    const a22 = data[10];
    const a23 = data[11];

    // Perform axis-specific matrix multiplication
    data[0] = a00 * c - a20 * s;
    data[1] = a01 * c - a21 * s;
    data[2] = a02 * c - a22 * s;
    data[3] = a03 * c - a23 * s;
    data[8] = a00 * s + a20 * c;
    data[9] = a01 * s + a21 * c;
    data[10] = a02 * s + a22 * c;
    data[11] = a03 * s + a23 * c;
    return this;
  }

  /**
   * Rotates a matrix by the given angle around the Z axis
   *
   * @param {number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */
  rotateZ(rad: number) {
    const { data: out, data: a } = this;
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a03 = a[3];
    const a10 = a[4];
    const a11 = a[5];
    const a12 = a[6];
    const a13 = a[7];
    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return this;
  }

  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, dest, vec);
   *
   * @param {vec3} vector Translation vector
   * @returns {mat4} out
   */
  fromTranslation(vector: vec3) {
    const v=vector.data;
    const data=this.data
    data[0] = 1;
    data[1] = 0;
    data[2] = 0;
    data[3] = 0;
    data[4] = 0;
    data[5] = 1;
    data[6] = 0;
    data[7] = 0;
    data[8] = 0;
    data[9] = 0;
    data[10] = 1;
    data[11] = 0;
    data[12] = v[0];
    data[13] = v[1];
    data[14] = v[2];
    data[15] = 1;
    return this;
  }

  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.scale(dest, dest, vec);
   * @param {vec3} vector Scaling vector
   * @returns {mat4} out
   */
  fromScaling(vector: vec3) {
    const v=vector.data;
    const data=this.data
    data[0] = v[0];
    data[1] = 0;
    data[2] = 0;
    data[3] = 0;
    data[4] = 0;
    data[5] = v[1];
    data[6] = 0;
    data[7] = 0;
    data[8] = 0;
    data[9] = 0;
    data[10] = v[2];
    data[11] = 0;
    data[12] = 0;
    data[13] = 0;
    data[14] = 0;
    data[15] = 1;
    return this;
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
  fromRotation(rad: number, axis: vec3) {
    const data=this.data
    const { data: v } = axis;
    let x = v[0],
      y = v[1],
      z = v[2];
    let len = Math.hypot(x, y, z);
    let s, c, t;

    if (len < mathf.EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    // Perform rotation-specific matrix multiplication
    data[0] = x * x * t + c;
    data[1] = y * x * t + z * s;
    data[2] = z * x * t - y * s;
    data[3] = 0;
    data[4] = x * y * t - z * s;
    data[5] = y * y * t + c;
    data[6] = z * y * t + x * s;
    data[7] = 0;
    data[8] = x * z * t + y * s;
    data[9] = y * z * t - x * s;
    data[10] = z * z * t + c;
    data[11] = 0;
    data[12] = 0;
    data[13] = 0;
    data[14] = 0;
    data[15] = 1;
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
  fromXRotation(rad: number) {
    const data=this.data
    let s = Math.sin(rad);
    let c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    data[0] = 1;
    data[1] = 0;
    data[2] = 0;
    data[3] = 0;
    data[4] = 0;
    data[5] = c;
    data[6] = s;
    data[7] = 0;
    data[8] = 0;
    data[9] = -s;
    data[10] = c;
    data[11] = 0;
    data[12] = 0;
    data[13] = 0;
    data[14] = 0;
    data[15] = 1;
    return this;
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
  fromYRotation(rad: number) {
    const data=this.data
    let s = Math.sin(rad);
    let c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    data[0] = c;
    data[1] = 0;
    data[2] = -s;
    data[3] = 0;
    data[4] = 0;
    data[5] = 1;
    data[6] = 0;
    data[7] = 0;
    data[8] = s;
    data[9] = 0;
    data[10] = c;
    data[11] = 0;
    data[12] = 0;
    data[13] = 0;
    data[14] = 0;
    data[15] = 1;
    return this;
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
  fromZRotation(rad: number) {
    const data=this.data
    let s = Math.sin(rad);
    let c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    data[0] = c;
    data[1] = s;
    data[2] = 0;
    data[3] = 0;
    data[4] = -s;
    data[5] = c;
    data[6] = 0;
    data[7] = 0;
    data[8] = 0;
    data[9] = 0;
    data[10] = 1;
    data[11] = 0;
    data[12] = 0;
    data[13] = 0;
    data[14] = 0;
    data[15] = 1;
    return this;
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
   * @param {quat4} rotation Rotation quaternion
   * @param {vec3} translation Translation vector
   * @returns {mat4} out
   */
  fromRotationTranslation(rotation: quat, translation: vec3) {
    const q=rotation.data;
    const v=translation.data;
    const data=this.data
    // Quaternion math
    const x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
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

    data[0] = 1 - (yy + zz);
    data[1] = xy + wz;
    data[2] = xz - wy;
    data[3] = 0;
    data[4] = xy - wz;
    data[5] = 1 - (xx + zz);
    data[6] = yz + wx;
    data[7] = 0;
    data[8] = xz + wy;
    data[9] = yz - wx;
    data[10] = 1 - (xx + yy);
    data[11] = 0;
    data[12] = v[0];
    data[13] = v[1];
    data[14] = v[2];
    data[15] = 1;

    return this;
  }
  /**
   * Returns the translation vector component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslation,
   *  the returned vector will be the same as the translation vector
   *  originally supplied.
   * @return {vec3} out
   */
  getTranslation() {
    const data=this.data
    return new vec3(
      data[12],
      data[13],
      data[14]
    );
  }

  /**
   * Returns the scaling factor component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslationScale
   *  with a normalized Quaternion paramter, the returned vector will be
   *  the same as the scaling vector
   *  originally supplied.
   * @return {vec3} out
   */
  getScaling() {
    const data=this.data
    let m11 = data[0];
    let m12 = data[1];
    let m13 = data[2];
    let m21 = data[4];
    let m22 = data[5];
    let m23 = data[6];
    let m31 = data[8];
    let m32 = data[9];
    let m33 = data[10];
    return new vec3(
      Math.hypot(m11, m12, m13),
      Math.hypot(m21, m22, m23),
      Math.hypot(m31, m32, m33)
    );
  }

  /**
   * Returns a quaternion representing the rotational component
   *  of a transformation matrix. If a matrix is built with
   *  fromRotationTranslation, the returned quaternion will be the
   *  same as the quaternion originally supplied.
   * @return {quat} out
   */
  getRotation() {
    const { data: mat } = this;
    const scaling = this.getScaling();

    let is1 = 1 / scaling.data[0];
    let is2 = 1 / scaling.data[1];
    let is3 = 1 / scaling.data[2];

    let sm11 = mat[0] * is1;
    let sm12 = mat[1] * is2;
    let sm13 = mat[2] * is3;
    let sm21 = mat[4] * is1;
    let sm22 = mat[5] * is2;
    let sm23 = mat[6] * is3;
    let sm31 = mat[8] * is1;
    let sm32 = mat[9] * is2;
    let sm33 = mat[10] * is3;

    let trace = sm11 + sm22 + sm33;
    let S = 0;
    const q = new quat();
    const { data } = q;
    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      data[3] = 0.25 * S;
      data[0] = (sm23 - sm32) / S;
      data[1] = (sm31 - sm13) / S;
      data[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
      data[3] = (sm23 - sm32) / S;
      data[0] = 0.25 * S;
      data[1] = (sm12 + sm21) / S;
      data[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
      data[3] = (sm31 - sm13) / S;
      data[0] = (sm12 + sm21) / S;
      data[1] = 0.25 * S;
      data[2] = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
      data[3] = (sm12 - sm21) / S;
      data[0] = (sm31 + sm13) / S;
      data[1] = (sm23 + sm32) / S;
      data[2] = 0.25 * S;
    }

    return q;
  }

  /**
   * Decomposes a transformation matrix into its rotation, translation
   * and scale components. Returns only the rotation component
   * @param  {quat} q Quaternion to receive the rotation component
   * @param  {vec3} t Vector to receive the translation vector
   * @param  {vec3} s Vector to receive the scaling factor
   * @returns {quat} out_r
   */
  decompose(q: quat, t: vec3, s: vec3) {
    const { data: out_r } = q;
    const { data: out_t } = t;
    const { data: out_s } = s;
    const data=this.data

    out_t[0] = data[12];
    out_t[1] = data[13];
    out_t[2] = data[14];

    let m11 = data[0];
    let m12 = data[1];
    let m13 = data[2];
    let m21 = data[4];
    let m22 = data[5];
    let m23 = data[6];
    let m31 = data[8];
    let m32 = data[9];
    let m33 = data[10];

    out_s[0] = Math.hypot(m11, m12, m13);
    out_s[1] = Math.hypot(m21, m22, m23);
    out_s[2] = Math.hypot(m31, m32, m33);

    let is1 = 1 / out_s[0];
    let is2 = 1 / out_s[1];
    let is3 = 1 / out_s[2];

    let sm11 = m11 * is1;
    let sm12 = m12 * is2;
    let sm13 = m13 * is3;
    let sm21 = m21 * is1;
    let sm22 = m22 * is2;
    let sm23 = m23 * is3;
    let sm31 = m31 * is1;
    let sm32 = m32 * is2;
    let sm33 = m33 * is3;

    let trace = sm11 + sm22 + sm33;
    let S = 0;

    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      out_r[3] = 0.25 * S;
      out_r[0] = (sm23 - sm32) / S;
      out_r[1] = (sm31 - sm13) / S;
      out_r[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
      out_r[3] = (sm23 - sm32) / S;
      out_r[0] = 0.25 * S;
      out_r[1] = (sm12 + sm21) / S;
      out_r[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
      out_r[3] = (sm31 - sm13) / S;
      out_r[0] = (sm12 + sm21) / S;
      out_r[1] = 0.25 * S;
      out_r[2] = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
      out_r[3] = (sm12 - sm21) / S;
      out_r[0] = (sm31 + sm13) / S;
      out_r[1] = (sm23 + sm32) / S;
      out_r[2] = 0.25 * S;
    }
    return this;
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
   * @param {quat4} rotation Rotation quaternion
   * @param {vec3} translation Translation vector
   * @param {vec3} scaling Scaling vector
   * @returns {mat4} out
   */
  fromRotationTranslationScale(rotation: quat, translation: vec3, scaling: vec3) {
    const q=rotation.data;
    const v=translation.data;
    const { data: s } = scaling;
    const data=this.data
    // Quaternion math
    const x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
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
    const sx = s[0];
    const sy = s[1];
    const sz = s[2];

    data[0] = (1 - (yy + zz)) * sx;
    data[1] = (xy + wz) * sx;
    data[2] = (xz - wy) * sx;
    data[3] = 0;
    data[4] = (xy - wz) * sy;
    data[5] = (1 - (xx + zz)) * sy;
    data[6] = (yz + wx) * sy;
    data[7] = 0;
    data[8] = (xz + wy) * sz;
    data[9] = (yz - wx) * sz;
    data[10] = (1 - (xx + yy)) * sz;
    data[11] = 0;
    data[12] = v[0];
    data[13] = v[1];
    data[14] = v[2];
    data[15] = 1;

    return this;
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
   * @param {quat4} rotation Rotation quaternion
   * @param {vec3} translation Translation vector
   * @param {vec3} scaling Scaling vector
   * @param {vec3} origin The origin vector around which to scale and rotate
   * @returns {mat4} out
   */
  fromRotationTranslationScaleOrigin(rotation: quat, translation: vec3, scaling: vec3, origin: vec3) {
    const q=rotation.data;
    const v=translation.data;
    const { data: s } = scaling;
    const { data: o } = origin;
    const data=this.data
    // Quaternion math
    let x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;

    let xx = x * x2;
    let xy = x * y2;
    let xz = x * z2;
    let yy = y * y2;
    let yz = y * z2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;

    let sx = s[0];
    let sy = s[1];
    let sz = s[2];

    let ox = o[0];
    let oy = o[1];
    let oz = o[2];

    let out0 = (1 - (yy + zz)) * sx;
    let out1 = (xy + wz) * sx;
    let out2 = (xz - wy) * sx;
    let out4 = (xy - wz) * sy;
    let out5 = (1 - (xx + zz)) * sy;
    let out6 = (yz + wx) * sy;
    let out8 = (xz + wy) * sz;
    let out9 = (yz - wx) * sz;
    let out10 = (1 - (xx + yy)) * sz;

    data[0] = out0;
    data[1] = out1;
    data[2] = out2;
    data[3] = 0;
    data[4] = out4;
    data[5] = out5;
    data[6] = out6;
    data[7] = 0;
    data[8] = out8;
    data[9] = out9;
    data[10] = out10;
    data[11] = 0;
    data[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
    data[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
    data[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
    data[15] = 1;

    return this;
  }

  /**
   * Calculates a 4x4 matrix from the given quaternion
   * @param {ReadonlyQuat} rotation Quaternion to create matrix from
   * @returns {mat4} out
   */
  fromQuat(rotation: quat) {
    const q=rotation.data;
    const data=this.data
    let x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;

    let xx = x * x2;
    let yx = y * x2;
    let yy = y * y2;
    let zx = z * x2;
    let zy = z * y2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;

    data[0] = 1 - yy - zz;
    data[1] = yx + wz;
    data[2] = zx - wy;
    data[3] = 0;

    data[4] = yx - wz;
    data[5] = 1 - xx - zz;
    data[6] = zy + wx;
    data[7] = 0;

    data[8] = zx + wy;
    data[9] = zy - wx;
    data[10] = 1 - xx - yy;
    data[11] = 0;

    data[12] = 0;
    data[13] = 0;
    data[14] = 0;
    data[15] = 1;

    return this;
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
  frustum(left: number, right: number, bottom: number, top: number, near: number, far: number) {
    const data=this.data
    let rl = 1 / (right - left);
    let tb = 1 / (top - bottom);
    let nf = 1 / (near - far);
    data[0] = near * 2 * rl;
    data[1] = 0;
    data[2] = 0;
    data[3] = 0;
    data[4] = 0;
    data[5] = near * 2 * tb;
    data[6] = 0;
    data[7] = 0;
    data[8] = (right + left) * rl;
    data[9] = (top + bottom) * tb;
    data[10] = (far + near) * nf;
    data[11] = -1;
    data[12] = 0;
    data[13] = 0;
    data[14] = far * near * 2 * nf;
    data[15] = 0;
    return this;
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
  perspectiveNO(fovy: number, aspect: number, near: number, far: number) {
    const data=this.data
    const f = 1.0 / Math.tan(fovy / 2);
    data[0] = f / aspect;
    data[1] = 0;
    data[2] = 0;
    data[3] = 0;
    data[4] = 0;
    data[5] = f;
    data[6] = 0;
    data[7] = 0;
    data[8] = 0;
    data[9] = 0;
    data[11] = -1;
    data[12] = 0;
    data[13] = 0;
    data[15] = 0;
    if (far != null && far !== Infinity) {
      const nf = 1 / (near - far);
      data[10] = (far + near) * nf;
      data[14] = 2 * far * near * nf;
    } else {
      data[10] = -1;
      data[14] = -2 * near;
    }
    return this;
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
  perspectiveZO(fovy: number, aspect: number, near: number, far: number) {
    const out=this.data;
    const f = 1.0 / Math.tan(fovy / 2);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
      const nf = 1 / (near - far);
      out[10] = far * nf;
      out[14] = far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -near;
    }
    return out;
  }

  /**
   * Generates a perspective projection matrix with the given field of view.
   * This is primarily useful for generating projection matrices to be used
   * with the still experiemental WebVR API.
   *
   * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */
  perspectiveFromFieldOfView(fov: { upDegrees: number, downDegrees: number, leftDegrees: number, rightDegrees: number }, near: number, far: number) {
    const data=this.data
    let upTan = Math.tan((fov.upDegrees * Math.PI) / 180.0);
    let downTan = Math.tan((fov.downDegrees * Math.PI) / 180.0);
    let leftTan = Math.tan((fov.leftDegrees * Math.PI) / 180.0);
    let rightTan = Math.tan((fov.rightDegrees * Math.PI) / 180.0);
    let xScale = 2.0 / (leftTan + rightTan);
    let yScale = 2.0 / (upTan + downTan);

    data[0] = xScale;
    data[1] = 0.0;
    data[2] = 0.0;
    data[3] = 0.0;
    data[4] = 0.0;
    data[5] = yScale;
    data[6] = 0.0;
    data[7] = 0.0;
    data[8] = -((leftTan - rightTan) * xScale * 0.5);
    data[9] = (upTan - downTan) * yScale * 0.5;
    data[10] = far / (near - far);
    data[11] = -1.0;
    data[12] = 0.0;
    data[13] = 0.0;
    data[14] = (far * near) / (near - far);
    data[15] = 0.0;
    return this;
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
  orthoNO(left: number, right: number, bottom: number, top: number, near: number, far: number) {
    const data=this.data
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    data[0] = -2 * lr;
    data[1] = 0;
    data[2] = 0;
    data[3] = 0;
    data[4] = 0;
    data[5] = -2 * bt;
    data[6] = 0;
    data[7] = 0;
    data[8] = 0;
    data[9] = 0;
    data[10] = 2 * nf;
    data[11] = 0;
    data[12] = (left + right) * lr;
    data[13] = (top + bottom) * bt;
    data[14] = (far + near) * nf;
    data[15] = 1;
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
  orthoZO(left: number, right: number, bottom: number, top: number, near: number, far: number) {
    const data=this.data
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    data[0] = -2 * lr;
    data[1] = 0;
    data[2] = 0;
    data[3] = 0;
    data[4] = 0;
    data[5] = -2 * bt;
    data[6] = 0;
    data[7] = 0;
    data[8] = 0;
    data[9] = 0;
    data[10] = nf;
    data[11] = 0;
    data[12] = (left + right) * lr;
    data[13] = (top + bottom) * bt;
    data[14] = near * nf;
    data[15] = 1;
    return this;
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
  lookAt(eye: vec3, center: vec3, up: vec3) {
    const { data: _eye } = eye;
    const { data: _center } = center;
    const { data: _up } = up;
    const data=this.data
    let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    let eyex = _eye[0];
    let eyey = _eye[1];
    let eyez = _eye[2];
    let upx = _up[0];
    let upy = _up[1];
    let upz = _up[2];
    let centerx = _center[0];
    let centery = _center[1];
    let centerz = _center[2];

    if (
      Math.abs(eyex - centerx) < mathf.EPSILON &&
      Math.abs(eyey - centery) < mathf.EPSILON &&
      Math.abs(eyez - centerz) < mathf.EPSILON
    ) {
      return this.identity();
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.hypot(z0, z1, z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.hypot(x0, x1, x2);
    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.hypot(y0, y1, y2);
    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }

    data[0] = x0;
    data[1] = y0;
    data[2] = z0;
    data[3] = 0;
    data[4] = x1;
    data[5] = y1;
    data[6] = z1;
    data[7] = 0;
    data[8] = x2;
    data[9] = y2;
    data[10] = z2;
    data[11] = 0;
    data[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    data[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    data[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    data[15] = 1;

    return this;
  }

  /**
   * Generates a matrix that makes something look at something else.
   *
   * @param {vec3} eye Position of the viewer
   * @param {vec3} center Point the viewer is looking at
   * @param {vec3} up vec3 pointing up
   * @returns {mat4} out
   */
  targetTo(eye: vec3, center: vec3, up: vec3) {
    const { data: e } = eye;
    const { data: c } = center;
    const { data: u } = up;
    const data=this.data
    let eyex = e[0],
      eyey = e[1],
      eyez = e[2],
      upx = u[0],
      upy = u[1],
      upz = u[2];

    let z0 = eyex - c[0],
      z1 = eyey - c[1],
      z2 = eyez - c[2];

    let len = z0 * z0 + z1 * z1 + z2 * z2;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      z0 *= len;
      z1 *= len;
      z2 *= len;
    }

    let x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;

    len = x0 * x0 + x1 * x1 + x2 * x2;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    data[0] = x0;
    data[1] = x1;
    data[2] = x2;
    data[3] = 0;
    data[4] = z1 * x2 - z2 * x1;
    data[5] = z2 * x0 - z0 * x2;
    data[6] = z0 * x1 - z1 * x0;
    data[7] = 0;
    data[8] = z0;
    data[9] = z1;
    data[10] = z2;
    data[11] = 0;
    data[12] = eyex;
    data[13] = eyey;
    data[14] = eyez;
    data[15] = 1;
    return this;
  }


  /**
   * Returns Frobenius norm of a mat4
   *
   * @returns {number} Frobenius norm
   */
  frob() {
    const data=this.data
    return Math.hypot(
      data[0],
      data[1],
      data[2],
      data[3],
      data[4],
      data[5],
      data[6],
      data[7],
      data[8],
      data[9],
      data[10],
      data[11],
      data[12],
      data[13],
      data[14],
      data[15]
    );
  }

  /**
   * Adds two mat4's
   * @param {mat4} matrix the second operand
   * @returns {mat4} out
   */
  add(matrix: mat4) {
    const b=matrix.data;
    const data=this.data
    data[0] = data[0] + b[0];
    data[1] = data[1] + b[1];
    data[2] = data[2] + b[2];
    data[3] = data[3] + b[3];
    data[4] = data[4] + b[4];
    data[5] = data[5] + b[5];
    data[6] = data[6] + b[6];
    data[7] = data[7] + b[7];
    data[8] = data[8] + b[8];
    data[9] = data[9] + b[9];
    data[10] = data[10] + b[10];
    data[11] = data[11] + b[11];
    data[12] = data[12] + b[12];
    data[13] = data[13] + b[13];
    data[14] = data[14] + b[14];
    data[15] = data[15] + b[15];
    return this;
  }

  /**
   * Subtracts matrix b from matrix a
   * @param {mat4} matrix the second operand
   * @returns {mat4} out
   */
  subtract(matrix: mat4) {
    const data=this.data
    const b=matrix.data;
    data[0] = data[0] - b[0];
    data[1] = data[1] - b[1];
    data[2] = data[2] - b[2];
    data[3] = data[3] - b[3];
    data[4] = data[4] - b[4];
    data[5] = data[5] - b[5];
    data[6] = data[6] - b[6];
    data[7] = data[7] - b[7];
    data[8] = data[8] - b[8];
    data[9] = data[9] - b[9];
    data[10] = data[10] - b[10];
    data[11] = data[11] - b[11];
    data[12] = data[12] - b[12];
    data[13] = data[13] - b[13];
    data[14] = data[14] - b[14];
    data[15] = data[15] - b[15];
    return data;
  }

  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {number} s amount to scale the matrix's elements by
   * @returns {mat4} out
   */
  multiplyScalar(s: number) {
    const { data: data } = this;
    data[0] = data[0] * s;
    data[1] = data[1] * s;
    data[2] = data[2] * s;
    data[3] = data[3] * s;
    data[4] = data[4] * s;
    data[5] = data[5] * s;
    data[6] = data[6] * s;
    data[7] = data[7] * s;
    data[8] = data[8] * s;
    data[9] = data[9] * s;
    data[10] = data[10] * s;
    data[11] = data[11] * s;
    data[12] = data[12] * s;
    data[13] = data[13] * s;
    data[14] = data[14] * s;
    data[15] = data[15] * s;
    return this;
  }
}