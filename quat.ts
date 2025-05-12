import mathf, { AngleOrder } from "./mathf";
import { rvec3, vec3, vec3Cross, vec3CrossBy, vec3Dot, vec3Normalize, vec3SquaredLength } from "./vec3";

export interface quat
{
    x: number;
    y: number;
    z: number;
    w: number;
}

export type rquat = Readonly<quat>;

export function quatIdentity(): quat
{
    return {x: 0, y: 0, z: 0, w: 1}
}

/**
 * Clones this quat
 *
 * @param v the quat to clone
 * @returns a new quat
 */
export function quatClone(v: rquat): quat
{
    return {x: v.x, y: v.y, z: v.z, w: v.w};
}

/**
 * Calculates the length quat q
 *
 * @params the source quat
 * @returns length of q
 */
export function quatLength(q: rquat)
{
    return Math.sqrt(q.x ** 2 + q.y ** 2 + q.z ** 2 + q.w ** 2);
}

/**
 * Calculates the squared length of a quat
 *
 * @params the source quat
 * @returns squared length of q
 */
export function quatSquaredLength(q: rquat)
{
    return q.x ** 2 + q.y ** 2 + q.z ** 2 + q.w ** 2;
}

/**
 * Sets a quat from the given angle and rotation axis, then returns it.
 * @param q the target quat
 * @param axis the axis around which to rotate
 * @param rad the angle in radians
 * @returns the target quat
 */
export function quatSetAxisAngle(q: quat, axis: rvec3, rad: number)
{
    rad = rad * 0.5;
    const s = Math.sin(rad);

    q.x = s * axis.x;
    q.y = s * axis.y;
    q.z = s * axis.z;
    q.w = Math.cos(rad);
    return q
}

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as provided in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param out Vector receiving the axis of rotation
 * @param q Quaternion to be decomposed
 * @return Angle, in radians, of the rotation
 */
export function quatGetAxisAngle(out: vec3, q: rquat)
{
    const rad = Math.acos(q.w) * 2.0;
    const s = Math.sin(rad / 2.0);

    if (s > mathf.EPSILON)
    {
      out.x = q.x / s;
      out.y = q.y / s;
      out.z = q.z / s;
    }
    else
    {
      // If s is zero, return any axis (no rotation - axis does not matter)
      out.x = 1;
      out.y = 0;
      out.z = 0;
    }
    return rad;
}

/**
 * Gets the angular distance between two unit quaternions
 *
 * @param left the left quat
 * @param right the right quat
 * @return Angle, in radians, between the two quaternions
 */
export function quatGetAngle(left: rquat, right: rquat)
{
    const dot = quatDot(left, right);
    return Math.acos(2 * dot * dot - 1);
}

/**
 * Calculates the dot product of two quat's
 * @param left the left quat
 * @param right the right quat
 * @returns dot product of left and right
 */
export function quatDot(left: rquat, right: rquat)
{
    return left.x * right.x + left.y * right.y + left.z * right.z + left.w * right.w;
}

  /**
 * Set the components of a quat to the given values
 *
 * @param x X component
 * @param y Y component
 * @param z Z component
 * @param w W component
 * @returns the target quat
 */
export function quatSet(q: quat, x: number, y: number, z: number, w: number)
{
    q.x = x;
    q.y = y;
    q.z = z;
    q.w = w;
    return q;
}

/**
 * Multiplies the left vector by the right vector
 * @param left the left vector
 * @param right the right vector
 * @returns the left vector
 */
export function quatMulTo(left: quat, right: rquat)
{
    const ax = left.x,
      ay = left.y,
      az = left.z,
      aw = left.w;
    const bx = right.x,
      by = right.y,
      bz = right.z,
      bw = right.w;

    left.x = ax * bw + aw * bx + ay * bz - az * by;
    left.y = ay * bw + aw * by + az * bx - ax * bz;
    left.z = az * bw + aw * bz + ax * by - ay * bx;
    left.w = aw * bw - ax * bx - ay * by - az * bz;

    return left;
}

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
export function quatRotateX(q: quat, rad: number)
{
    rad *= 0.5;

    const ax = q.x,
      ay = q.y,
      az = q.z,
      aw = q.w;
    const bx = Math.sin(rad),
      bw = Math.cos(rad);

    q.x = ax * bw + aw * bx;
    q.y = ay * bw + az * bx;
    q.z = az * bw - ay * bx;
    q.w = aw * bw - ax * bx;
    return q;
}

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
export function quatRotateY(q: quat, rad: number)
{
    rad *= 0.5;

    const ax = q.x,
      ay = q.y,
      az = q.z,
      aw = q.w;
    const by = Math.sin(rad),
      bw = Math.cos(rad);

    q.x = ax * bw - az * by;
    q.y = ay * bw + aw * by;
    q.z = az * bw + ax * by;
    q.w = aw * bw - ay * by;
    return q;
}

  /**
   * Rotates a quaternion by the given angle about the Z axis
   *
   * @param {quat} out quat receiving operation result
   * @param {quat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */
export function quatRotateZ(q: quat, rad: number)
{
    rad *= 0.5;

    const ax = q.x,
      ay = q.y,
      az = q.z,
      aw = q.w;
    const bz = Math.sin(rad),
      bw = Math.cos(rad);

    q.x = ax * bw + ay * bz;
    q.y = ay * bw - ax * bz;
    q.z = az * bw + aw * bz;
    q.w = aw * bw - az * bz;
    return q;
}

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @returns a new quat
 */
export function quatCalculateW(q: rquat): quat
{
    return {
      x: q.x,
      y: q.y,
      z: q.z,
      w: Math.sqrt(Math.abs(1.0 - q.x * q.x - q.y * q.y - q.z * q.z))
    };
}

/**
 * Adds vector other into vec
 * @param left the left quat
 * @param right the right quat
 * @returns the target quat
 */
export function quatAddTo(left: quat, right: rquat)
{
    left.x += right.x;
    left.y += right.y;
    left.z += right.z;
    left.w += right.w;
    return left;
}

/**
 * Adds two vectors into a new quat
 * @param left the left quat
 * @param right the right quat
 * @returns a new quat
 */
export function quatAdd(left: rquat, right: rquat): quat
{
    return {
        x: left.x + right.x,
        y: left.y + right.y,
        z: left.z + right.z,
        w: left.w + right.w
    }
}

/**
 * Subtracts quat other from quat vec
 * @param left the left quat
 * @param right the right quat
 * @returns the left quat
 */
export function quatSubFrom(left: quat, right: rquat)
{
    left.x -= right.x;
    left.y -= right.y;
    left.z -= right.z;
    left.w -= right.w;
    return left;
}

/**
 * Subtracts quat other from quat vec into a new quat
 * @param left the left quat
 * @param right the right quat
 * @returns a new quat
 */
export function quatSub(left: rquat, right: rquat): quat
{
    return {
        x: left.x - right.x,
        y: left.y - right.y,
        z: left.z - right.z,
        w: left.w - right.w,
    }
}

/**
 * Performs a spherical linear interpolation between two quat
 * @param {quat} q the second operand
 * @param {number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */
export function quatSlerp(left: rquat, right: rquat, t: number): quat
{
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    const ax = left.x,
      ay = left.y,
      az = left.z,
      aw = left.w;
    let bx = right.x,
      by = right.y,
      bz = right.z,
      bw = right.w;

    let omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    }

    // calculate coefficients
    if (1.0 - cosom > mathf.EPSILON)
    {
      // standard case (slerp)
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    }
    else
    {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1.0 - t;
      scale1 = t;
    }
    // calculate final values
    return {
      x: scale0 * ax + scale1 * bx,
      y: scale0 * ay + scale1 * by,
      z: scale0 * az + scale1 * bz,
      w: scale0 * aw + scale1 * bw
    };
}

/**
 * Calculates the inverse of a quat
 *
 * @returns {quat} out
 */
export function quatInvert(q: quat)
{
    const a0 = q.x,
      a1 = q.y,
      a2 = q.z,
      a3 = q.w;
    const dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    const invDot = dot ? 1.0 / dot : 0;

    q.x = -a0 * invDot;
    q.y = -a1 * invDot;
    q.z = -a2 * invDot;
    q.w = a3 * invDot;
    return q;
}

/**
 * Calculates the inverse of a quat
 *
 * @returns {quat} out
 */
export function quatInverted(q: rquat): quat
{
    const a0 = q.x,
      a1 = q.y,
      a2 = q.z,
      a3 = q.w;
    const dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    const invDot = dot ? 1.0 / dot : 0;

    return {
      x: -a0 * invDot,
      y: -a1 * invDot,
      z: -a2 * invDot,
      w: a3 * invDot
    };
}

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 * @returns {quat} out
 */
export function quatConjugate(q: quat)
{
    q.x = -q.x;
    q.y = -q.y;
    q.z = -q.z;
    q.w = q.w;
    return q;
}

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 * @returns {quat} out
 */
export function quatConjugated(q: rquat): quat
{
    return {
        x: -q.x,
        y: -q.y,
        z: -q.z,
        w: -q.w
    }
}

  /**
   * Creates a quaternion from the given 3x3 rotation matrix.
   *
   * NOTE: The resultant quaternion is not normalized, so you should be sure
   * to renormalize the quaternion yourself where necessary.
   * @param {mat3} matrix rotation matrix
   * @returns {quat} out
   * @function
   */
  /*
  fromMat3(matrix: mat3) {
    const data=this.data
    const m=matrix.data;
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    let fTrace = m[0] + m[4] + m[8];
    let fRoot;

    if (fTrace > 0.0) {
      // |w| > 1/2, may as well choose w > 1/2
      fRoot = Math.sqrt(fTrace + 1.0); // 2w
      data[3] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot; // 1/(4w)
      data[0] = (m[5] - m[7]) * fRoot;
      data[1] = (m[6] - m[2]) * fRoot;
      data[2] = (m[1] - m[3]) * fRoot;
    } else {
      // |w| <= 1/2
      let i = 0;
      if (m[4] > m[0]) i = 1;
      if (m[8] > m[i * 3 + i]) i = 2;
      let j = (i + 1) % 3;
      let k = (i + 2) % 3;

      fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
      data[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      data[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
      data[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
      data[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }
    return this;
  }
    */

/**
 * Creates a quaternion from the given euler angle x, y, z using the provided intrinsic order for the conversion.
 *
 * @params q the target quat
 * @param x Angle to rotate around X axis in degrees.
 * @param y Angle to rotate around Y axis in degrees.
 * @param z Angle to rotate around Z axis in degrees.
 * @param order Intrinsic order for conversion, default is zyx.
 * @returns the target quat
 */
export function quatFromEuler(q: quat, x: number, y: number, z: number, order: AngleOrder = mathf.ANGLE_ORDER)
{
    const halfToRad = Math.PI / 360;
    x *= halfToRad;
    z *= halfToRad;
    y *= halfToRad;

    const sx = Math.sin(x);
    const cx = Math.cos(x);
    const sy = Math.sin(y);
    const cy = Math.cos(y);
    const sz = Math.sin(z);
    const cz = Math.cos(z);

    switch (order) {
      case "xyz":
        q.x = sx * cy * cz + cx * sy * sz;
        q.y = cx * sy * cz - sx * cy * sz;
        q.z = cx * cy * sz + sx * sy * cz;
        q.w = cx * cy * cz - sx * sy * sz;
        break;

      case "xzy":
        q.x = sx * cy * cz - cx * sy * sz;
        q.y = cx * sy * cz - sx * cy * sz;
        q.z = cx * cy * sz + sx * sy * cz;
        q.w = cx * cy * cz + sx * sy * sz;
        break;

      case "yxz":
        q.x = sx * cy * cz + cx * sy * sz;
        q.y = cx * sy * cz - sx * cy * sz;
        q.z = cx * cy * sz - sx * sy * cz;
        q.w = cx * cy * cz + sx * sy * sz;
        break;

      case "yzx":
        q.x = sx * cy * cz + cx * sy * sz;
        q.y = cx * sy * cz + sx * cy * sz;
        q.z = cx * cy * sz - sx * sy * cz;
        q.w = cx * cy * cz - sx * sy * sz;
        break;

      case "zxy":
        q.x = sx * cy * cz - cx * sy * sz;
        q.y = cx * sy * cz + sx * cy * sz;
        q.z = cx * cy * sz + sx * sy * cz;
        q.w = cx * cy * cz - sx * sy * sz;
        break;

      case "zyx":
        q.x = sx * cy * cz - cx * sy * sz;
        q.y = cx * sy * cz + sx * cy * sz;
        q.z = cx * cy * sz - sx * sy * cz;
        q.w = cx * cy * cz + sx * sy * sz;
        break;

      default:
        throw new Error('Unknown angle order ' + order);
    }

    return this;
}

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
export function quatRotationTo(q: quat, a: rvec3, right: rvec3)
{
    const dot = vec3Dot(a, right);
    if (dot < -0.999999)
    {
        const xUnit = {x: 1, y: 0, z: 0};
        let tmpVec3 = vec3CrossBy(xUnit, xUnit, a);
        if (vec3SquaredLength(tmpVec3) < mathf.EPSILON)
        {
            const yUnit = {x: 0, y: 1, z : 0};
            tmpVec3 = vec3CrossBy(yUnit, yUnit, a);
        }

        vec3Normalize(tmpVec3, tmpVec3);

        quatSetAxisAngle(q, tmpVec3, Math.PI);
        return q;
    }
    else if (dot > 0.999999)
    {
        q.x = 0;
        q.y = 0;
        q.z = 0;
        q.w = 1;
        return this;
    }
    else
    {
        const tmpVec3 = vec3Cross(a, right);
        q.x = tmpVec3.x;
        q.y = tmpVec3.y;
        q.z = tmpVec3.z;
        q.w = 1 + dot;
        return quatNormalize(q);
    }
}

/**
 * Normalize the given vector v
 * @param v the target vector
 * @returns the target vector
 */
export function quatNormalize(v: quat)
{
    let sqrtLen = quatSquaredLength(v);
    if (sqrtLen > 0)
    {
        sqrtLen = 1.0 / Math.sqrt(sqrtLen);
    }

    v.x *= sqrtLen;
    v.y *= sqrtLen;
    v.z *= sqrtLen;
    v.w *= sqrtLen;
    return v;
}

/**
 * Normalize the given vector v into a new vector
 * @param v the target vector
 * @returns a new vector
 */
export function quatNormalized(v: rquat): quat
{
    let sqrtLen = quatSquaredLength(v);
    if (sqrtLen > 0)
    {
        sqrtLen = 1.0 / Math.sqrt(sqrtLen);
    }

    return {
        x: v.x * sqrtLen,
        y: v.y * sqrtLen,
        z: v.z * sqrtLen,
        w: v.w * sqrtLen
    }
}

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */
export function quatSQlerp(a: rquat, b: rquat, c: rquat, d: rquat, t: number)
{
    const temp1 = quatSlerp(a, d, t);
    const temp2 = quatSlerp(b, c, t);
    return quatSlerp(temp1, temp2, 2 * t * (1 - t));
};

  /**
   * Sets the specified quaternion with values corresponding to the given
   * axes. Each axis is a vec3 and is expected to be unit length and
   * perpendicular to all other specified axes.
   *
   * @param {vec3} view  the vector representing the viewing direction
   * @param {vec3} right the vector representing the local "right" direction
   * @param {vec3} up    the vector representing the local "up" direction
   * @returns {quat} out
   */
//   export function quatSetAxes(view: vec3, right: vec3, up: vec3) {
//     let _matrix = new mat3();
//     const { data: matr } = _matrix;
//     const { data: r } = right;
//     const { data: v } = view;
//     const { data: u } = up;
//     matr[0] = r[0];
//     matr[3] = r[1];
//     matr[6] = r[2];

//     matr[1] = u[0];
//     matr[4] = u[1];
//     matr[7] = u[2];

//     matr[2] = -v[0];
//     matr[5] = -v[1];
//     matr[8] = -v[2];
//     return this.fromMat3(_matrix).normalize();
//   }