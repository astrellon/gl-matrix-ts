import vec2 from "./vec2";

export default class mat2 {
  private static readonly _identity: Float32Array = new Float32Array([1, 0, 0, 1]);
  /**
   * 2x2 Matrix
   * @module mat2
   */
  data: Float32Array;
  /**
   * Creates a new identity mat2
   *
   * @returns {mat2} a new 2x2 matrix
   */
  constructor(data?: ArrayLike<number>) {
    if (!data) {
      this.data = new Float32Array(mat2._identity);
    } else {
      this.data = new Float32Array(data);
    }
  }

  /**
   * Creates a new mat2 initialized with values from an existing matrix
   *
   * @param {ReadonlyMat2} a matrix to clone
   * @returns {mat2} a new 2x2 matrix
   */
  clone() {
    return new mat2(this.data);
  }

  /**
   * Copy the values from one mat2 to another
   *
   * @param {ReadonlyMat2} matrix the source matrix
   * @returns {mat2} data
   */
  copy(matrix: mat2) {
    this.data.set(matrix.data);
    return this;
  }

  /**
   * Set a mat2 to the identity matrix
   *
   * @param {mat2} data the receiving matrix
   * @returns {mat2} data
   */
  identity() {
    this.data.set(mat2._identity);
    return this;
  }

  /**
   * Set the components of a mat2 to the given values
   *
   * @param {number} m00 Component in column 0, row 0 position (index 0)
   * @param {number} m01 Component in column 0, row 1 position (index 1)
   * @param {number} m10 Component in column 1, row 0 position (index 2)
   * @param {number} m11 Component in column 1, row 1 position (index 3)
   * @returns {mat2} data
   */
  set(m00: number, m01: number, m10: number, m11: number) {
    const data=this.data
    data[0] = m00;
    data[1] = m01;
    data[2] = m10;
    data[3] = m11;
    return this;
  }

  /**
   * Transpose the values of a mat2
   * @param {ReadonlyMat2} matrix the source matrix
   * @returns {mat2} data
   */
  transpose(matrix: mat2) {
    const data=this.data;
    const a=matrix.data;
    let a1 = a[1];
    data[1] = a[2];
    data[2] = a1;
    return this;
  }

  /**
   * Inverts a mat2
   *
   * @returns {mat2} data
   */
  invert() {
    const data=this.data;
    let a0 = data[0],
      a1 = data[1],
      a2 = data[2],
      a3 = data[3];

    // Calculate the determinant
    let det = a0 * a3 - a2 * a1;

    if (!det) {
      return null;
    }
    det = 1.0 / det;

    data[0] = a3 * det;
    data[1] = -a1 * det;
    data[2] = -a2 * det;
    data[3] = a0 * det;

    return this;
  }

  /**
   * Calculates the adjugate of a mat2
   *
   * @returns {mat2} data
   */
  adjoint() {
    const data=this.data;
    // Caching this value is necessary if data == a
    let a0 = data[0];
    data[0] = data[3];
    data[1] = -data[1];
    data[2] = -data[2];
    data[3] = a0;

    return this;
  }

  /**
   * Calculates the determinant of a mat2
   *
   * @returns {number} determinant of a
   */
  determinant() {
    const data=this.data;
    return data[0] * data[3] - data[2] * data[1];
  }

  /**
   * Multiplies two mat2's
   * @param {ReadonlyMat2} matrix the second operand
   * @returns {mat2} data
   */
  multiply(matrix:mat2) {
    const data=this.data;
    const b=matrix.data;
    let a0 = data[0],
      a1 = data[1],
      a2 = data[2],
      a3 = data[3];
    let b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
    data[0] = a0 * b0 + a2 * b1;
    data[1] = a1 * b0 + a3 * b1;
    data[2] = a0 * b2 + a2 * b3;
    data[3] = a1 * b2 + a3 * b3;
    return this;
  }

  /**
   * Rotates a mat2 by the given angle
   *
   * @param {number} rad the angle to rotate the matrix by
   * @returns {mat2} data
   */
  rotate(rad:number) {
    const data=this.data;
    let a0 = data[0],
      a1 = data[1],
      a2 = data[2],
      a3 = data[3];
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    data[0] = a0 * c + a2 * s;
    data[1] = a1 * c + a3 * s;
    data[2] = a0 * -s + a2 * c;
    data[3] = a1 * -s + a3 * c;
    return this;
  }

  /**
   * Scales the mat2 by the dimensions in the given vec2
   * @param {vec2} vector the vec2 to scale the matrix by
   * @returns {mat2} data
   */
  scale(vector:vec2) {
    const data=this.data;
    const v=vector.data;
    let a0 = data[0],
      a1 = data[1],
      a2 = data[2],
      a3 = data[3];
    let v0 = v[0],
      v1 = v[1];
    data[0] = a0 * v0;
    data[1] = a1 * v0;
    data[2] = a2 * v1;
    data[3] = a3 * v1;
    return this;
  }

  /**
   * Creates a matrix from a given angle
   * This is equivalent to (but much faster than):
   *
   *     mat2.identity(dest);
   *     mat2.rotate(dest, dest, rad);
   *
   * @param {number} rad the angle to rotate the matrix by
   * @returns {mat2} data
   */
  fromRotation(rad:number) {
    const data=this.data;
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    data[0] = c;
    data[1] = s;
    data[2] = -s;
    data[3] = c;
    return this;
  }

  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   * 
   *     mat2.identity(dest);
   *     mat2.scale(dest, dest, vec);
   * @param {vec2} vector Scaling vector
   * @returns {mat2} data
   */
  fromScaling(vector:vec2) {
    const data=this.data;
    const v=vector.data;
    data[0] = v[0];
    data[1] = 0;
    data[2] = 0;
    data[3] = v[1];
    return this;
  }

  /**
   * Returns Frobenius norm of a mat2
   *
   * @returns {number} Frobenius norm
   */
  frob() {
    const data=this.data;
    return Math.hypot(data[0], data[1], data[2], data[3]);
  }

  /**
   * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
   * @param {ReadonlyMat2} L the lower triangular matrix
   * @param {ReadonlyMat2} D the diagonal matrix
   * @param {ReadonlyMat2} U the upper triangular matrix
   * @param {ReadonlyMat2} A the input matrix to factorize
   */

  LDU(L:mat2, D:mat2, U:mat2, A:mat2) {
    const l=L.data;
    const d=D.data;
    const u=U.data;
    const a=A.data;
    l[2] = a[2] / a[0];
    u[0] = a[0];
    u[1] = a[1];
    u[3] = a[3] - l[2] * u[1];
    return [l, d, u];
  }

  /**
   * Adds two mat2's
   * @param {mat2} data the receiving matrix
   * @param {ReadonlyMat2} matrix the second operand
   * @returns {mat2} data
   */
  add(matrix:mat2) {
    const data=this.data;
    const b=matrix.data;
    data[0] = data[0] + b[0];
    data[1] = data[1] + b[1];
    data[2] = data[2] + b[2];
    data[3] = data[3] + b[3];
    return this;
  }

  /**
   * Subtracts matrix b from matrix a
   * @param {ReadonlyMat2} matrix the second operand
   * @returns {mat2} data
   */
  subtract(matrix:mat2) {
    const data=this.data;
    const b=matrix.data;
    data[0] = data[0] - b[0];
    data[1] = data[1] - b[1];
    data[2] = data[2] - b[2];
    data[3] = data[3] - b[3];
    return this;
  }

  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {number} s amount to scale the matrix's elements by
   * @returns {mat2} data
   */
  multiplyScalar(s:number) {
    const data=this.data;
    data[0] = data[0] * s;
    data[1] = data[1] * s;
    data[2] = data[2] * s;
    data[3] = data[3] * s;
    return this;
  }
}