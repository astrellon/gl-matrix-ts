import mat4 from "./mat4";
import quat from "./quat";

/**
 * 4 Dimensional Vector
 * @module vec4
 */
export default class vec4 {
  data: Float32Array;
  /**
   * Creates a new, empty vec4
   *
   * @returns {vec4} a new 4D vector
   */
  constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
    this.data = new Float32Array([x, y, z, w]);
  }


  get x() {
    return this.data[0];
  }

  set x(value: number) {
    this.data[0] = value;
  }

  get y() {
    return this.data[1];
  }

  set y(value: number) {
    this.data[1] = value;
  }

  get z() {
    return this.data[2];
  }

  set z(value: number) {
    this.data[2] = value;
  }

  get w() {
    return this.data[3];
  }

  set w(value: number) {
    this.data[3] = value;
  }

  /**
   * Creates a new vec4 initialized with values from an existing vector
   *
   * @returns {vec4} a new 4D vector
   */
  clone() {
    const x = this.data[0];
    const y = this.data[1];
    const z = this.data[2];
    const w = this.data[3];
    return new vec4(x, y, z, w);
  }

  /**
   * Copy the values from one vec4 to another
   *

   * @param {ReadonlyVec4} vector the source vector
   * @returns {vec4} out
   */
  copy(vector: vec4) {
    this.data.set(vector.data);
    return this;
  }

  /**
   * Set the components of a vec4 to the given values
   *
   * @param {number} x X component
   * @param {number} y Y component
   * @param {number} z Z component
   * @param {number} w W component
   * @returns {vec4} out
   */
  set(x: number, y: number, z: number, w: number) {
    const data = this.data
    data[0] = x;
    data[1] = y;
    data[2] = z;
    data[3] = w;
    return this;
  }

  /**
   * Adds two vec4's
   * @param {ReadonlyVec4} vector the second operand
   * @returns {vec4} out
   */
  add(vector: vec4) {
    const out = this.data;
    const a = this.data;
    const b = vector.data
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return this;
  }

  /**
   * Subtracts vector b from vector a
   * @param {ReadonlyVec4} vector the second operand
   * @returns {vec4} out
   */
  subtract(vector: vec4) {
    const data = this.data
    const b = vector.data
    data[0] = data[0] - b[0];
    data[1] = data[1] - b[1];
    data[2] = data[2] - b[2];
    data[3] = data[3] - b[3];
    return this;
  }

  /**
   * Multiplies two vec4's
   * 
   * @param {ReadonlyVec4} vector the second operand
   * @returns {vec4} out
   */
  multiply(vector: vec4) {
    const { data: data } = this;
    const b = vector.data
    data[0] = data[0] * b[0];
    data[1] = data[1] * b[1];
    data[2] = data[2] * b[2];
    data[3] = data[3] * b[3];
    return this;
  }

  /**
   * Divides two vec4's
   * @param {ReadonlyVec4} vector the second operand
   * @returns {vec4} out
   */
  divide(vector: vec4) {
    const data = this.data
    const b = vector.data
    data[0] = data[0] / b[0];
    data[1] = data[1] / b[1];
    data[2] = data[2] / b[2];
    data[3] = data[3] / b[3];
    return this;
  }

  /**
   * Scales a vec4 by a scalar number
   *
   * @param {number} s amount to scale the vector by
   * @returns {vec4} out
   */
  scale(s: number) {
    const out = this.data;
    const a = this.data;
    out[0] = a[0] * s;
    out[1] = a[1] * s;
    out[2] = a[2] * s;
    out[3] = a[3] * s;
    return this;
  }

  /**
   * Calculates the euclidian distance between two vec4's
   * @param {ReadonlyVec4} vector the second operand
   * @returns {number} distance between a and b
   */
  distance(vector: vec4) {
    const a = this.data;
    const b = vector.data
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];
    let w = b[3] - a[3];
    return Math.hypot(x, y, z, w);
  }

  /**
   * Calculates the squared euclidian distance between two vec4's
   * @param {ReadonlyVec4} vector the second operand
   * @returns {number} squared distance between a and b
   */
  squaredDistance(vector: vec4) {
    const a = this.data;
    const b = vector.data
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];
    let w = b[3] - a[3];
    return x * x + y * y + z * z + w * w;
  }

  /**
   * Calculates the length of a vec4
   *
   * @returns {number} length of a
   */
  length() {
    const [x, y, z, w] = this.data;
    return Math.hypot(x, y, z, w);
  }

  /**
   * Calculates the squared length of a vec4
   *
   * @returns {number} squared length of a
   */
  squaredLength() {
    const [x, y, z, w] = this.data;
    return x * x + y * y + z * z + w * w;
  }

  /**
   * Negates the components of a vec4
   *
   * @returns {vec4} out
   */
  negate() {
    const { data: a, data: out } = this;
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return this;
  }

  /**
   * Returns the inverse of the components of a vec4
   *
   * @returns {vec4} out
   */
  inverse() {
    const { data: a, data: out } = this;
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    out[3] = 1.0 / a[3];
    return this;
  }

  /**
   * Normalize a vec4
   *
   * @returns {vec4} out
   */
  normalize() {
    const { data: a, data: out } = this;
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let w = a[3];
    let len = x * x + y * y + z * z + w * w;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }
    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
    return this;
  }

  /**
   * Calculates the dot product of two vec4's
   * 
   * @param {ReadonlyVec4} vector the second operand
   * @returns {number} dot product of a and b
   */
  dot(vector: vec4) {
    const a = this.data;
    const b = vector.data
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }

  /**
   * Returns the cross-product of three vectors in a 4-dimensional space
   *
   * @param {ReadonlyVec4} v2 the second vector
   * @param {ReadonlyVec4} v3 the third vector
   * @returns {vec4} result
   */
  cross(v2: vec4, v3: vec4) {
    const { data: u } = this;
    const { data: v } = v2;
    const { data: w } = v3;
    let A = v[0] * w[1] - v[1] * w[0],
      B = v[0] * w[2] - v[2] * w[0],
      C = v[0] * w[3] - v[3] * w[0],
      D = v[1] * w[2] - v[2] * w[1],
      E = v[1] * w[3] - v[3] * w[1],
      F = v[2] * w[3] - v[3] * w[2];
    let G = u[0];
    let H = u[1];
    let I = u[2];
    let J = u[3];

    return new vec4(
      H * F - I * E + J * D,
      -(G * F) + I * C - J * B,
      G * E - H * C + J * A,
      -(G * D) + H * B - I * A
    );
  }

  /**
   * Performs a linear interpolation between two vec4's
   * @param {ReadonlyVec4} vector the second operand
   * @param {number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec4} out
   */
  lerp(vector: vec4, t: number) {
    const a = this.data;
    const b = vector.data
    let ax = a[0];
    let ay = a[1];
    let az = a[2];
    let aw = a[3];
    return this.set(
      ax + t * (b[0] - ax),
      ay + t * (b[1] - ay),
      az + t * (b[2] - az),
      aw + t * (b[3] - aw)
    );
  }

  /**
   * Transforms the vec4 with a mat4.
   * @param {mat4} matrix matrix to transform with
   * @returns {vec4} out
   */
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

  /**
   * Transforms the vec4 with a quat
   * @param {ReadonlyQuat} rotation quaternion to transform with
   * @returns {vec4} out
   */
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
  }

  /**
   * Set the components of a vec4 to zero
   *
   * @returns {vec4} out
   */
  zero() {
    this.data.fill(0);
    return this;
  }

}