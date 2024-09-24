class ListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashMap {
  constructor() {
    this.size = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.size).fill(null);
    this.count = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return Math.abs(hashCode) % this.buckets.length;
  }

  resize() {
    const newSize = this.size * 2;
    const newBuckets = new Array(newSize).fill(null);

    this.buckets.forEach((bucket) => {
      let current = bucket;
      while (current) {
        const newHashKey = this.hash(current.key) % newSize;
        if (newBuckets[newHashKey] === null) {
          newBuckets[newHashKey] = new ListNode(current.key, current.value);
        } else {
          let newCurrent = newBuckets[newHashKey];
          while (newCurrent.next !== null) {
            newCurrent = newCurrent.next;
          }
          newCurrent.next = new ListNode(current.key, current.value);
        }
        current = current.next;
      }
    });

    this.buckets = newBuckets;
    this.size = newSize;
  }

  set(key, value) {
    const hashKey = this.hash(key);
    if (hashKey < 0 || hashKey >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    if (this.count >= this.size * this.loadFactor) {
      this.resize();
    }
    let head = this.buckets[hashKey];

    if (head === null) {
      this.buckets[hashKey] = new ListNode(key, value);
      this.count++;
    } else {
      let current = head;
      while (true) {
        if (current.key === key) {
          current.value = value;
          return;
        }
        if (current.next === null) {
          break;
        }
        current = current.next;
      }

      current.next = new ListNode(key, value);
      this.count++;
    }
  }

  get(key) {
    const hashKey = this.hash(key);
    if (hashKey < 0 || hashKey >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    let current = this.buckets[hashKey];

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    return null;
  }

  has(key) {
    const hashKey = this.hash(key);
    let current = this.buckets[hashKey];

    while (current) {
      if (current.key === key) {
        return true;
      }
      current = current.next;
    }

    return false;
  }

  remove(key) {
    const hashKey = this.hash(key);
    if (hashKey < 0 || hashKey >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (!this.has(key)) {
      return;
    }

    let current = this.buckets[hashKey];
    let previous = null;

    while (current) {
      if (current.key === key) {
        if (previous === null) {
          this.buckets[hashKey] = current.next;
        } else {
          previous.next = current.next;
        }
        this.count--;
        return;
      }
      previous = current;
      current = current.next;
    }
  }

  length() {
    return this.count;
  }

  clear() {
    this.buckets = new Array(this.size).fill(null);
    this.count = 0;
  }

  keys() {
    let keysArr = [];
    this.buckets.forEach((bucket) => {
      let current = bucket;
      while (current !== null) {
        keysArr.push(current.key);
        current = current.next;
      }
    });
    return keysArr;
  }

  values() {
    let valuesArr = [];
    this.buckets.forEach((bucket) => {
      let current = bucket;
      while (current !== null) {
        valuesArr.push(current.value);
        current = current.next;
      }
    });
    return valuesArr;
  }

  entries() {
    let entriesArr = [];
    this.buckets.forEach((bucket) => {
      let current = bucket;
      while (current !== null) {
        entriesArr.push([current.key, current.value]);
        current = current.next;
      }
    });
    return entriesArr;
  }
}
/*
const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("apple", "pink");
test.set("kite", "green");
test.set("moon", "silver");
test.set("sun", "golden");



console.log(test.length());
console.log(test.count);
console.log(test.buckets);*/
