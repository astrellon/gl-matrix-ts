import mat4 from "./mat4";
import quat from "./quat";
import vec2 from "./vec2";

/**
 * 3x3 Matrix
 * @module mat3
 */
export default class mat3 {
  private static readonly _identity: Float32Array = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  data: Float32Array;
  /**
   * Creates a new identity mat3
   *
   * @returns {mat3} a new 3x3 matrix
   */
  constructor(data?: ArrayLike<number>) {
    if (data) {
      this.data = new Float32Array(data);
    } else {
      this.data = new Float32Array(mat3._identity);
    }
  }

  /**
   * Copies the upper-left 3x3 values into the given mat3.
   * @param {mat4} matrix the source 4x4 matrix
   * @returns {mat3} data
   */
  fromMat4(matrix: mat4) {
    const data=this.data
    const a=matrix.data;
    data[0] = a[0];
    data[1] = a[1];
    data[2] = a[2];
    data[3] = a[4];
    data[4] = a[5];
    data[5] = a[6];
    data[6] = a[8];
    data[7] = a[9];
    data[8] = a[10];
    return this;
  }

  /**
   * Creates a new mat3 initialized with values from an existing matrix
   *
   * @returns {mat3} a new 3x3 matrix
   */
  clone() {
    return new mat3(this.data);
  }

  /**
   * Copy the values from one mat3 to another
   *
   * @param {mat3} a the source matrix
   * @returns {mat3} data
   */
  copy(a: mat3) {
    this.data.set(a.data);
    return this;
  }

  /**
   * Set the components of a mat3 to the given values
   *
   * @param {number} m00 Component in column 0, row 0 position (index 0)
   * @param {number} m01 Component in column 0, row 1 position (index 1)
   * @param {number} m02 Component in column 0, row 2 position (index 2)
   * @param {number} m10 Component in column 1, row 0 position (index 3)
   * @param {number} m11 Component in column 1, row 1 position (index 4)
   * @param {number} m12 Component in column 1, row 2 position (index 5)
   * @param {number} m20 Component in column 2, row 0 position (index 6)
   * @param {number} m21 Component in column 2, row 1 position (index 7)
   * @param {number} m22 Component in column 2, row 2 position (index 8)
   * @returns {mat3} data
   */
  set(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number) {
    const data=this.data
    data[0] = m00;
    data[1] = m01;
    data[2] = m02;
    data[3] = m10;
    data[4] = m11;
    data[5] = m12;
    data[6] = m20;
    data[7] = m21;
    data[8] = m22;
    return this;
  }

  /**
   * Set a mat3 to the identity matrix
   *
   * @returns {mat3} data
   */
  identity() {
    this.data.set(mat3._identity);
    return this;
  }

  /**
   * Transpose the values of a mat3
   *
   * @returns {mat3} data
   */
  transpose() {
    const { data, data: a } = this;
    let a01 = a[1],
      a02 = a[2],
      a12 = a[5];
    data[1] = a[3];
    data[2] = a[6];
    data[3] = a01;
    data[5] = a[7];
    data[6] = a02;
    data[7] = a12;
    return this;
  }

  /**
   * Inverts a mat3
   *
   * @returns {mat3} data
   */
  invert() {
    const data=this.data
    const a00 = data[0],
      a01 = data[1],
      a02 = data[2];
    const a10 = data[3],
      a11 = data[4],
      a12 = data[5];
    const a20 = data[6],
      a21 = data[7],
      a22 = data[8];

    const b01 = a22 * a11 - a12 * a21;
    const b11 = -a22 * a10 + a12 * a20;
    const b21 = a21 * a10 - a11 * a20;

    // Calculate the determinant
    let det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
      return null;
    }
    det = 1.0 / det;

    data[0] = b01 * det;
    data[1] = (-a22 * a01 + a02 * a21) * det;
    data[2] = (a12 * a01 - a02 * a11) * det;
    data[3] = b11 * det;
    data[4] = (a22 * a00 - a02 * a20) * det;
    data[5] = (-a12 * a00 + a02 * a10) * det;
    data[6] = b21 * det;
    data[7] = (-a21 * a00 + a01 * a20) * det;
    data[8] = (a11 * a00 - a01 * a10) * det;
    return this;
  }

  /**
   * Calculates the adjugate of a mat3
   *
   * @returns {mat3} data
   */
  adjoint() {
    const data=this.data
    const a00 = data[0],
      a01 = data[1],
      a02 = data[2];
    const a10 = data[3],
      a11 = data[4],
      a12 = data[5];
    const a20 = data[6],
      a21 = data[7],
      a22 = data[8];

    data[0] = a11 * a22 - a12 * a21;
    data[1] = a02 * a21 - a01 * a22;
    data[2] = a01 * a12 - a02 * a11;
    data[3] = a12 * a20 - a10 * a22;
    data[4] = a00 * a22 - a02 * a20;
    data[5] = a02 * a10 - a00 * a12;
    data[6] = a10 * a21 - a11 * a20;
    data[7] = a01 * a20 - a00 * a21;
    data[8] = a00 * a11 - a01 * a10;
    return this;
  }

  /**
   * Calculates the determinant of a mat3
   * 
   * @returns {number} determinant of a
   */
  determinant() {
    const data=this.data
    const a00 = data[0],
      a01 = data[1],
      a02 = data[2];
    const a10 = data[3],
      a11 = data[4],
      a12 = data[5];
    const a20 = data[6],
      a21 = data[7],
      a22 = data[8];

    return (
      a00 * (a22 * a11 - a12 * a21) +
      a01 * (-a22 * a10 + a12 * a20) +
      a02 * (a21 * a10 - a11 * a20)
    );
  }

  /**
   * Multiplies two mat3's
   * @param {mat3} matrix the second operand
   * @returns {mat3} data
   */
  multiply(matrix: mat3) {
    const data=this.data
    const b=matrix.data;
    const a00 = data[0],
      a01 = data[1],
      a02 = data[2];
    const a10 = data[3],
      a11 = data[4],
      a12 = data[5];
    const a20 = data[6],
      a21 = data[7],
      a22 = data[8];

    const b00 = b[0],
      b01 = b[1],
      b02 = b[2];
    const b10 = b[3],
      b11 = b[4],
      b12 = b[5];
    const b20 = b[6],
      b21 = b[7],
      b22 = b[8];

    data[0] = b00 * a00 + b01 * a10 + b02 * a20;
    data[1] = b00 * a01 + b01 * a11 + b02 * a21;
    data[2] = b00 * a02 + b01 * a12 + b02 * a22;

    data[3] = b10 * a00 + b11 * a10 + b12 * a20;
    data[4] = b10 * a01 + b11 * a11 + b12 * a21;
    data[5] = b10 * a02 + b11 * a12 + b12 * a22;

    data[6] = b20 * a00 + b21 * a10 + b22 * a20;
    data[7] = b20 * a01 + b21 * a11 + b22 * a21;
    data[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return this;
  }

  /**
   * Translate a mat3 by the given vector
   * @param {vec2} translation vector to translate by
   * @returns {mat3} data
   */
  translate(translation: vec2) {
    const data=this.data
    const { data: b } = translation;
    const a00 = data[0],
      a01 = data[1],
      a02 = data[2],
      a10 = data[3],
      a11 = data[4],
      a12 = data[5],
      a20 = data[6],
      a21 = data[7],
      a22 = data[8],
      x = b[0],
      y = b[1];

    data[0] = a00;
    data[1] = a01;
    data[2] = a02;

    data[3] = a10;
    data[4] = a11;
    data[5] = a12;

    data[6] = x * a00 + y * a10 + a20;
    data[7] = x * a01 + y * a11 + a21;
    data[8] = x * a02 + y * a12 + a22;
    return this;
  }

  /**
   * Rotates a mat3 by the given angle
   *
   * @param {number} rad the angle to rotate the matrix by
   * @returns {mat3} data
   */
  rotate(rad: number) {
    const data=this.data
    const a00 = data[0],
      a01 = data[1],
      a02 = data[2],
      a10 = data[3],
      a11 = data[4],
      a12 = data[5],
      a20 = data[6],
      a21 = data[7],
      a22 = data[8],
      s = Math.sin(rad),
      c = Math.cos(rad);

    data[0] = c * a00 + s * a10;
    data[1] = c * a01 + s * a11;
    data[2] = c * a02 + s * a12;

    data[3] = c * a10 - s * a00;
    data[4] = c * a11 - s * a01;
    data[5] = c * a12 - s * a02;

    data[6] = a20;
    data[7] = a21;
    data[8] = a22;
    return this;
  }

  /**
   * Scales the mat3 by the dimensions in the given vec2
   * @param {vec2} vector the vec2 to scale the matrix by
   * @returns {mat3} data
   */
  scale(vector: vec2) {
    const data=this.data
    const v=vector.data;
    let x = v[0],
      y = v[1];

    data[0] = x * data[0];
    data[1] = x * data[1];
    data[2] = x * data[2];

    data[3] = y * data[3];
    data[4] = y * data[4];
    data[5] = y * data[5];
    return this;
  }

  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   * 
   *     mat3.identity(dest);
   *     mat3.translate(dest, dest, vec);
   * @param {vec2} translation Translation vector
   * @returns {mat3} data
   */
  fromTranslation(translation: vec2) {
    const v=translation.data;
    const data=this.data
    data[0] = 1;
    data[1] = 0;
    data[2] = 0;
    data[3] = 0;
    data[4] = 1;
    data[5] = 0;
    data[6] = v[0];
    data[7] = v[1];
    data[8] = 1;
    return this;
  }

  /**
   * Creates a matrix from a given angle
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.rotate(dest, dest, rad);
   *
   * @param {number} rad the angle to rotate the matrix by
   * @returns {mat3} data
   */
  fromRotation(rad: number) {
    const data=this.data
    const s = Math.sin(rad),
      c = Math.cos(rad);

    data[0] = c;
    data[1] = s;
    data[2] = 0;

    data[3] = -s;
    data[4] = c;
    data[5] = 0;

    data[6] = 0;
    data[7] = 0;
    data[8] = 1;
    return this;
  }

  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   * 
   *     mat3.identity(dest);
   *     mat3.scale(dest, dest, vec);
   * @param {vec2} s Scaling vector
   * @returns {mat3} data
   */
  fromScaling(s: vec2) {
    const data=this.data
    const v=s.data;
    data[0] = v[0];
    data[1] = 0;
    data[2] = 0;

    data[3] = 0;
    data[4] = v[1];
    data[5] = 0;

    data[6] = 0;
    data[7] = 0;
    data[8] = 1;
    return this;
  }

  /**
   * Calculates a 3x3 matrix from the given quaternion
   * @param {ReadonlyQuat} rotation Quaternion to create matrix from
   * @returns {mat3} data
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
    data[3] = yx - wz;
    data[6] = zx + wy;

    data[1] = yx + wz;
    data[4] = 1 - xx - zz;
    data[7] = zy - wx;

    data[2] = zx - wy;
    data[5] = zy + wx;
    data[8] = 1 - xx - yy;

    return this;
  }

  /**
   * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
   * @param {mat4} matrix Mat4 to derive the normal matrix from
   * @returns {mat3} data
   */
  normalFromMat4(matrix: mat4) {
    const a=matrix.data;
    const data=this.data
    const a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
    const a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
    const a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
    const a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

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
    let det =
      b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return null;
    }
    det = 1.0 / det;

    data[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    data[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    data[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    data[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    data[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    data[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    data[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    data[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    data[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return this;
  }

  /**
   * Generates a 2D projection matrix with the given bounds
   *
   * @param {mat3} data mat3 frustum matrix will be written into
   * @param {number} width Width of your gl context
   * @param {number} height Height of gl context
   * @returns {mat3} data
   */
  projection(width: number, height: number) {
    const data=this.data
    data[0] = 2 / width;
    data[1] = 0;
    data[2] = 0;
    data[3] = 0;
    data[4] = -2 / height;
    data[5] = 0;
    data[6] = -1;
    data[7] = 1;
    data[8] = 1;
    return this;
  }


  /**
   * Returns Frobenius norm of a mat3
   * @param {mat3} matrix the matrix to calculate Frobenius norm of
   * @returns {number} Frobenius norm
   */
  frob(matrix: mat3) {
    const { data } = matrix;
    return Math.hypot(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8]);
  }

  /**
   * Adds two mat3's
   *
   * @param {mat3} data the receiving matrix
   * @param {mat3} a the first operand
   * @param {mat3} b the second operand
   * @returns {mat3} data
   */
  add(matrix: mat3) {
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
    return this;
  }

  /**
   * Subtracts matrix b from matrix a
   * @param {mat3} matrix the second operand
   * @returns {mat3} data
   */
  subtract(matrix: mat3) {
    const b=matrix.data;
    const data=this.data
    data[0] = data[0] - b[0];
    data[1] = data[1] - b[1];
    data[2] = data[2] - b[2];
    data[3] = data[3] - b[3];
    data[4] = data[4] - b[4];
    data[5] = data[5] - b[5];
    data[6] = data[6] - b[6];
    data[7] = data[7] - b[7];
    data[8] = data[8] - b[8];
    return this;
  }

  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {number} s amount to scale the matrix's elements by
   * @returns {mat3} data
   */
  multiplyScalar(s: number) {
    const data=this.data;
    data[0] = data[0] * s;
    data[1] = data[1] * s;
    data[2] = data[2] * s;
    data[3] = data[3] * s;
    data[4] = data[4] * s;
    data[5] = data[5] * s;
    data[6] = data[6] * s;
    data[7] = data[7] * s;
    data[8] = data[8] * s;
    return this;
  }

}