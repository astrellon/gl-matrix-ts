import mat2 from "./mat2";
import mat3 from "./mat3";
import mat4 from "./mat4";
import vec3 from "./vec3";


export default class vec2 {
  /**
   * 2 Dimensional Vector
   * @module vec2
   */
  data: Float32Array;

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
  /**
   * Creates a new, empty vec2
   *
   * @returns {vec2} a new 2D vector
   */
  constructor(x: number = 0, y: number = 0) {
    this.data = new Float32Array([x, y]);
  }

  /**
   * Creates a new vec2 initialized with values from an existing vector
   *
   * @returns {vec2} a new 2D vector
   */
  clone() {
    return new vec2(this.data[0], this.data[1]);
  }

  /**
   * Copy the values from one vec2 to another
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the source vector
   * @returns {vec2} out
   */
  copy(a: vec2) {
    this.data.set(a.data);
    return this;
  }

  /**
   * Set the components of a vec2 to the given values
   *
   * @param {number} x X component
   * @param {number} y Y component
   * @returns {vec2} out
   */
  set(x: number = 0, y: number = 0) {
    this.data.set([x, y]);
    return this;
  }

  /**
   * Adds two vec2's
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */
  add(b: vec2) {
    this.data[0] += b.data[0];
    this.data[1] += b.data[1];
    return this;
  }

  /**
   * Subtracts vector b from vector a
   *
   * @param {vec2} vector the second operand
   * @returns {vec2} out
   */
  subtract(vector: vec2) {
    const x=vector.data[0],y=vector.data[1];
    this.data[0] -= x;
    this.data[1] -= y;
    return this;
  }

  /**
   * Multiplies two vec2's
   *
   * @param {vec2} vector the second operand
   * @returns {vec2} out
   */
  multiply(vector: vec2) {
    const x=vector.data[0],y=vector.data[1];
    const data=this.data
    data[0] *= x;
    data[1] *= y;
    return this;
  }

  /**
   * Divides two vec2's
   *
   * @param {vec2} vector the second operand
   * @returns {vec2} out
   */
  divide(vector: vec2) {
    const x=vector.data[0],y=vector.data[1];
    this.data[0] /= x;
    this.data[1] /= y;
    return this;
  }

  /**
   * Scales a vec2 by a scalar number
   *
   * @param {number} s amount to scale the vector by
   * @returns {vec2} out
   */
  scale(s: number) {
    const data=this.data
    data[0] *= s;
    data[1] *= s;
    return this;
  }

  /**
   * Calculates the euclidian distance between two vec2's
   * @param {vec2} vector the second operand
   * @returns {number} distance between a and b
   */
  distance(vector: vec2) {
    const a=this.data;
    const b=vector.data
    return Math.hypot(b[0] - a[0], b[1] - a[1]);
  }

  /**
   * Calculates the squared euclidian distance between two vec2's
   * @param {vec2} vector the second operand
   * @returns {number} squared distance between a and b
   */
  squaredDistance(vector: vec2) {
    const a=this.data;
    const b=vector.data
    var x = b[0] - a[0],
      y = b[1] - a[1];
    return x * x + y * y;
  }

  /**
   * Calculates the length of a vec2
   *
   * @returns {number} length of a
   */
  length() {
    const a=this.data;
    return Math.hypot(a[0], a[1]);
  }

  /**
   * Calculates the squared length of a vec2
   *
   * @returns {number} squared length of a
   */
  squaredLength() {
    const a=this.data;
    var x = a[0],
      y = a[1];
    return x * x + y * y;
  }

  /**
   * Negates the components of a vec2
   *
   * @returns {vec2} out
   */
  negate() {
    const data=this.data;
    data[0] = -data[0];
    data[1] = -data[1];
    return this;
  }

  /**
   * Returns the inverse of the components of a vec2
   *
   * @returns {vec2} out
   */
  inverse() {
    const out=this.data;
    out[0] = 1.0 / out[0];
    out[1] = 1.0 / out[1];
    return this;
  }

  /**
   * Normalize a vec2
   *
   * @returns {vec2} out
   */
  normalize() {
    const out=this.data;
    var x = out[0],
      y = out[1];
    var len = x * x + y * y;
    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
    }
    out[0] = out[0] * len;
    out[1] = out[1] * len;
    return this;
  }

  /**
   * Calculates the dot product of two vec2's
   *
   * @param {vec2} b the second operand
   * @returns {number} dot product of a and b
   */
  dot(vector: vec2) {
    const a=this.data;
    const b=vector.data
    return a[0] * b[0] + a[1] * b[1];
  }

  /**
   * Computes the cross product of two vec2's
   * Note that the cross product must by definition produce a 3D vector
   * @param {vec2} vector the second operand
   * @returns {vec3} out
   */
  cross(vector: vec2) {
    const a=this.data;
    const b=vector.data
    var z = a[0] * b[1] - a[1] * b[0];
    return new vec3(0, 0, z);
  }

  /**
   * Performs a linear interpolation between two vec2's
   *
   * @param {vec2} vector the second operand
   * @param {number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec2} out
   */
  lerp(vector: vec2, t: number) {
    const a=this.data;
    const b=vector.data
    var ax = a[0],
      ay = a[1];
    return this.set(
      ax + t * (b[0] - ax),
      ay + t * (b[1] - ay)
    );
  }

  /**
   * Transforms the vec2 with a mat2
   * @param {ReadonlyMat2} matrix matrix to transform with
   * @returns {vec2} out
   */
  transformMat2(matrix: mat2) {
    const data=this.data
    const m=matrix.data;
    var x = data[0],
      y = data[1];
    return this.set(
      m[0] * x + m[2] * y,
      m[1] * x + m[3] * y
    );
  }


  /**
   * Transforms the vec2 with a mat3
   * 3rd vector component is implicitly '1'
   *
   * @param {mat3} matrix matrix to transform with
   * @returns {vec2} out
   */
  transformMat3(matrix: mat3) {
    const a=this.data;
    const m=matrix.data;
    var x = a[0],
      y = a[1];
    return this.set(
      m[0] * x + m[3] * y + m[6],
      m[1] * x + m[4] * y + m[7]
    );
  }

  /**
   * Transforms the vec2 with a mat4
   * 3rd vector component is implicitly '0'
   * 4th vector component is implicitly '1'
   * @param {mat4} matrix matrix to transform with
   * @returns {vec2} out
   */
  transformMat4(matrix: mat4) {
    const a=this.data;
    const m=matrix.data;
    let x = a[0];
    let y = a[1];
    return this.set(
      m[0] * x + m[4] * y + m[12],
      m[1] * x + m[5] * y + m[13]
    );
  }

  /**
   * Rotate a 2D vector
   * @param {vec2} origin The origin of the rotation
   * @param {number} rad The angle of rotation in radians
   * @returns {vec2} out
   */
  rotate(origin: vec2, rad: number) {
    const a=this.data;
    const b=origin.data;
    //Translate point to the origin
    let p0 = a[0] - b[0],
      p1 = a[1] - b[1],
      sinC = Math.sin(rad),
      cosC = Math.cos(rad);

    //perform rotation and translate to correct position

    return this.set(
      p0 * cosC - p1 * sinC + b[0],
      p0 * sinC + p1 * cosC + b[1]
    );
  }

  /**
   * Get the angle between two 2D vectors
   * @param {vec2} vector The second operand
   * @returns {number} The angle in radians
   */
  angle(vector: vec2) {
    const a=this.data;
    const b=vector.data
    let x1 = a[0],
      y1 = a[1],
      x2 = b[0],
      y2 = b[1],
      // mag is the product of the magnitudes of a and b
      mag = Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2)),
      // mag &&.. short circuits if mag == 0
      cosine = mag && (x1 * x2 + y1 * y2) / mag;
    // Math.min(Math.max(cosine, -1), 1) clamps the cosine between -1 and 1
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }

  /**
   * Set the components of a vec2 to zero
   *
   * @returns {vec2} out
   */
  zero() {
    this.data.fill(0);
    return this;
  }

}