"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = longestCommonPrefix;
/**
 * Linear-time computation of the Longest Common Prefix array from a suffix
 * array based on the algorithm by Kasai et al.
 *
 * http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.118.8221&rep=rep1&type=pdf
 *
 * Copyright (C) 2017 Kim Burgaard <kim@burgaard.us>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Calculates the longest common prefix from a suffix array in linear time.
 *
 * @param {string[]} a sequence of character codes
 * @param {number[]} the corresponding suffix array.
 * @return number[] a longest common prefix array.
 */
function longestCommonPrefix(sequence, suffixArray) {
  var n = sequence.length;
  if (n !== suffixArray.length) {
    throw new Error("The sequence and suffix array lengths don't match: " + n + " != " + suffixArray.length);
  }

  var rank = [];
  var lcp = [];

  for (var i = 0; i < n; i++) {
    rank[suffixArray[i]] = i;
  }

  var h = 0;

  for (var _i = 0; _i < n; _i++) {
    var r = rank[_i];
    if (r > 0) {
      var j = suffixArray[r - 1];
      while (sequence[_i + h] === sequence[j + h]) {
        h++;
      }
      lcp[r] = h;
      if (h > 0) {
        h--;
      }
    }
  }

  return lcp.slice(1);
}