import mat3 from "./mat3";
import mat4 from "./mat4";
import quat from "./quat";

export default class vec3 {
  data: Float32Array;
  /**
   * 3 Dimensional Vector
   * @module vec3
   */
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
  /**
   * Creates a new, empty vec3
   *
   * @returns {vec3} a new 3D vector
   */
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.data = new Float32Array([x, y, z]);
  }

  /**
   * Creates a new vec3 initialized with values from an existing vector
   *
   * @param {vec3} a vector to clone
   * @returns {vec3} a new 3D vector
   */
  clone() {
    return new vec3(this.data[0], this.data[1], this.data[2]);
  }

  /**
   * Calculates the length of a vec3
   *
   * @returns {number} length of a
   */
  length() {
    const a = this.data;
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return Math.hypot(x, y, z);
  }

  /**
   * Copy the values from one vec3 to another
   * @param {vec3} v the source vector
   * @returns {vec3} out
   */
  copy(v: vec3) {
    const out = this.data;
    const { data: a } = v;
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return this;
  }

  /**
   * Set the components of a vec3 to the given values
   *
   * @param {number} x X component
   * @param {number} y Y component
   * @param {number} z Z component
   * @returns {vec3} out
   */
  set(x: number, y: number, z: number) {
    this.data.set([x, y, z]);
    return this;
  }

  /**
   * Adds two vec3's
   * @param {vec3} v the second operand
   * @returns {vec3} out
   */
  add(v: vec3) {
    const out = this.data;
    const { data: b } = v;
    out[0] += b[0];
    out[1] += b[1];
    out[2] += b[2];
    return this;
  }

  /**
   * Subtracts vector b from vector a
   * @param {vec3} v the second operand
   * @returns {vec3} out
   */
  subtract(v: vec3) {
    const out = this.data;
    const { data: b } = v;
    out[0] -= b[0];
    out[1] -= b[1];
    out[2] -= b[2];
    return this;
  }

  /**
   * Multiplies two vec3's
   * @param {vec3} v the second operand
   * @returns {vec3} out
   */
  multiply(v: vec3) {
    const out = this.data;
    const { data: b } = v;
    out[0] *= b[0];
    out[1] *= b[1];
    out[2] *= b[2];
    return this;
  }

  /**
   * Divides two vec3's
   * @param {vec3} v the second operand
   * @returns {vec3} out
   */
  divide(v: vec3) {
    const out = this.data;
    const { data: b } = v;
    out[0] /= b[0];
    out[1] /= b[1];
    out[2] /= b[2];
    return this;
  }

  /**
   * Scales a vec3 by a scalar number
   * @param {number} v amount to scale the vector by
   * @returns {vec3} out
   */
  scale(v: number) {
    const out = this.data;
    out[0] *= v;
    out[1] *= v;
    out[2] *= v;
    return this;
  }

  /**
   * Calculates the euclidian distance between two vec3's
   * @param {vec3} vector the second operand
   * @returns {number} distance between a and b
   */
  distance(vector: vec3) {
    const a = this.data;
    const b = vector.data
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];
    return Math.hypot(x, y, z);
  }

  /**
   * Calculates the squared euclidian distance between two vec3's
   * @param {vec3} vector the second operand
   * @returns {number} squared distance between a and b
   */
  squaredDistance(vector: vec3) {
    const a = this.data;
    const b = vector.data
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];
    return x * x + y * y + z * z;
  }

  /**
   * Calculates the squared length of a vec3
   *
   * @param {vec3} a vector to calculate squared length of
   * @returns {number} squared length of a
   */
  squaredLength() {
    const a = this.data;
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return x * x + y * y + z * z;
  }

  /**
   * Negates the components of a vec3
   *
   * @returns {vec3} out
   */
  negate() {
    const out = this.data;
    out[0] = -out[0];
    out[1] = -out[1];
    out[2] = -out[2];
    return this;
  }

  /**
   * Returns the inverse of the components of a vec3
   *
   * @returns {vec3} out
   */
  inverse() {
    const { data } = this;
    data[0] = 1.0 / data[0];
    data[1] = 1.0 / data[1];
    data[2] = 1.0 / data[2];
    return this;
  }

  /**
   * Normalize a vec3
   *
   * @returns {vec3} out
   */
  normalize() {
    const out = this.data;
    const a = this.data;
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let len = x * x + y * y + z * z;
    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
    }
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
    return this;
  }

  /**
   * Calculates the dot product of two vec3's
   * @param {vec3} vector the second operand
   * @returns {number} dot product of a and b
   */
  dot(vector: vec3) {
    const a = this.data;
    const b = vector.data
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  /**
   * Computes the cross product of two vec3's
   * @param {vec3} vector the second operand
   * @returns {vec3} out
   */
  cross(vector: vec3) {
    const a = this.data;
    const b = vector.data
    let ax = a[0],
      ay = a[1],
      az = a[2];
    let bx = b[0],
      by = b[1],
      bz = b[2];

    return this.set(ay * bz - az * by,
      az * bx - ax * bz,
      ax * by - ay * bx
    );
  }

  /**
   * Performs a linear interpolation between two vec3's
   * 
   * @param {vec3} vector the second operand
   * @param {number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec3} out
   */
  lerp(vector: vec3, t: number) {
    const data = this.data
    const b = vector.data
    let ax = data[0];
    let ay = data[1];
    let az = data[2];
    return this.set(
      ax + t * (b[0] - ax),
      ay + t * (b[1] - ay),
      az + t * (b[2] - az)
    );
  }

  /**
   * Performs a spherical linear interpolation between two vec3's
   * 
   * @param {vec3} vector the second operand
   * @param {number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec3} out
   */
  slerp(vector: vec3, t: number) {
    const a = this.data;
    const b = vector.data
    let angle = Math.acos(Math.min(Math.max(this.dot(vector), -1), 1));
    let sinTotal = Math.sin(angle);

    let ratioA = Math.sin((1 - t) * angle) / sinTotal;
    let ratioB = Math.sin(t * angle) / sinTotal;

    return this.set(
      ratioA * a[0] + ratioB * b[0],
      ratioA * a[1] + ratioB * b[1],
      ratioA * a[2] + ratioB * b[2]
    );
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

  /**
   * Transforms the vec3 with a mat4.
   * 4th vector component is implicitly '1'
   * @param {mat4} matrix matrix to transform with
   * @returns {vec3} out
   */
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

  /**
   * Transforms the vec3 with a mat3.
   * 
   * @param {mat3} matrix the 3x3 matrix to transform with
   * @returns {vec3} out
   */
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

  /**
   * Transforms the vec3 with a quat
   * Can also be used for dual quaternions. (Multiply it with the real part)
   * @param {ReadonlyQuat} rotation quaternion to transform with
   * @returns {vec3} out
   */
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
    return this.set(
      x + uvx + uuvx,
      y + uvy + uuvy,
      z + uvz + uuvz
    );
  }

  /**
   * Rotate a 3D vector around the x-axis
   * @param {vec3} origin The origin of the rotation
   * @param {number} rad The angle of rotation in radians
   * @returns {vec3} out
   */
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

    return this.set(
      r[0] + b[0],
      r[1] + b[1],
      r[2] + b[2]
    );
  }

  /**
   * Rotate a 3D vector around the y-axis
   * @param {vec3} origin The origin of the rotation
   * @param {number} rad The angle of rotation in radians
   * @returns {vec3} out
   */
  rotateY(origin: vec3, rad: number) {
    const data = this.data
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

    return this.set(
      r[0] + b[0],
      r[1] + b[1],
      r[2] + b[2]
    );
  }

  /**
   * Rotate a 3D vector around the z-axis
   * @param {vec3} origin The origin of the rotation
   * @param {number} rad The angle of rotation in radians
   * @returns {vec3} out
   */
  rotateZ(origin: vec3, rad: number) {
    const data = this.data
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

    return this.set(
      r[0] + b[0],
      r[1] + b[1],
      r[2] + b[2]
    );
  }

  /**
   * Get the angle between two 3D vectors
   * @param {vec3} vector The second operand
   * @returns {number} The angle in radians
   */
  angle(vector: vec3) {
    const data = this.data
    const b = vector.data
    let ax = data[0],
      ay = data[1],
      az = data[2],
      bx = b[0],
      by = b[1],
      bz = b[2],
      mag = Math.sqrt((ax * ax + ay * ay + az * az) * (bx * bx + by * by + bz * bz)),
      cosine = mag && this.dot(vector) / mag;
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }

  /**
   * Set the components of a vec3 to zero
   *
   * @returns {vec3} out
   */
  zero() {
    this.data.fill(0);
    return this;
  }
}