export interface CodeProblem {
  id: string;
  title: string;
  companyTag: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptanceRate: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  testCases: {
    input: string;
    expectedOutput: string;
    explanation?: string;
  }[];
  starterCode: {
    cpp: string;
    java: string;
    python: string;
    javascript: string;
  };
  complexityAnalysis: {
    time: string;
    space: string;
    optimalTechnique: string;
  };
}

export const CODING_PROBLEMS: CodeProblem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum - Target Index Pair',
    companyTag: 'Amazon / Zoho / TCS Digital',
    category: 'Arrays & Hash Maps',
    difficulty: 'Easy',
    acceptanceRate: '88.4%',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    inputFormat: 'nums = [2, 7, 11, 15], target = 9',
    outputFormat: '[0, 1]',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    testCases: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        expectedOutput: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        expectedOutput: '[1, 2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      },
      {
        input: 'nums = [3, 3], target = 6',
        expectedOutput: '[0, 1]',
        explanation: 'Both elements add up to 6.'
      }
    ],
    starterCode: {
      python: `# DKoder Placement Engine - Python 3.12
def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test execution with sample input
sample_nums = [2, 7, 11, 15]
sample_target = 9
print(twoSum(sample_nums, sample_target))
`,
      cpp: `// DKoder Placement Engine - C++ (GCC 14)
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {2, 7, 11, 15};
    vector<int> res = sol.twoSum(nums, 9);
    cout << "[" << res[0] << ", " << res[1] << "]" << endl;
    return 0;
}
`,
      java: `// DKoder Placement Engine - Java (OpenJDK 21)
import java.util.*;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }

    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int[] result = twoSum(nums, 9);
        System.out.println(Arrays.toString(result));
    }
}
`,
      javascript: `// DKoder Placement Engine - JavaScript (ES2024)
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));
`
    },
    complexityAnalysis: {
      time: 'O(N) single pass lookup',
      space: 'O(N) auxiliary hash table',
      optimalTechnique: 'One-pass hash map complement matching'
    }
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water - Peak Volume',
    companyTag: 'Google SWE / Adobe / Microsoft',
    category: 'Two Pointers & Monotonic Stack',
    difficulty: 'Hard',
    acceptanceRate: '61.2%',
    description:
      'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    inputFormat: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
    outputFormat: '6',
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5'
    ],
    testCases: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        expectedOutput: '6',
        explanation: 'Water trapped between elevation bars totals 6 units.'
      },
      {
        input: 'height = [4,2,0,3,2,5]',
        expectedOutput: '9',
        explanation: 'Large basin traps 9 units of water.'
      }
    ],
    starterCode: {
      python: `# DKoder Placement Engine - Python 3.12
def trap(height: list[int]) -> int:
    if not height: return 0
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
            
    return water

print(trap([0,1,0,2,1,0,1,3,2,1,2,1])) # Expected: 6
`,
      cpp: `// DKoder Placement Engine - C++ (GCC 14)
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int trap(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int left_max = 0, right_max = 0;
    int ans = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= left_max) left_max = height[left];
            else ans += (left_max - height[left]);
            ++left;
        } else {
            if (height[right] >= right_max) right_max = height[right];
            else ans += (right_max - height[right]);
            --right;
        }
    }
    return ans;
}

int main() {
    vector<int> h = {0,1,0,2,1,0,1,3,2,1,2,1};
    cout << "Trapped: " << trap(h) << endl;
    return 0;
}
`,
      java: `// DKoder Placement Engine - Java (OpenJDK 21)
public class RainWater {
    public static int trap(int[] height) {
        int l = 0, r = height.length - 1;
        int lMax = 0, rMax = 0;
        int water = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                if (height[l] >= lMax) lMax = height[l];
                else water += lMax - height[l];
                l++;
            } else {
                if (height[r] >= rMax) rMax = height[r];
                else water += rMax - height[r];
                r--;
            }
        }
        return water;
    }

    public static void main(String[] args) {
        int[] h = {0,1,0,2,1,0,1,3,2,1,2,1};
        System.out.println("Units: " + trap(h));
    }
}
`,
      javascript: `// DKoder Placement Engine - JavaScript (ES2024)
function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, total = 0;
  
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else total += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else total += rightMax - height[right];
      right--;
    }
  }
  return total;
}

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6
`
    },
    complexityAnalysis: {
      time: 'O(N) two pointers converge',
      space: 'O(1) constant extra variables',
      optimalTechnique: 'Dual pointer boundary compression'
    }
  },
  {
    id: 'lru-cache',
    title: 'Design LRU Cache (Least Recently Used)',
    companyTag: 'Amazon / Flipkart / Swiggy',
    category: 'Design & Doubly Linked List',
    difficulty: 'Medium',
    acceptanceRate: '49.8%',
    description:
      'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) average time complexity for both get and put operations.',
    inputFormat: 'LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)',
    outputFormat: '[null, null, null, 1, null, -1]',
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'At most 2 * 10^5 calls to get and put'
    ],
    testCases: [
      {
        input: 'capacity = 2, operations: put(1,1), put(2,2), get(1), put(3,3), get(2)',
        expectedOutput: 'get(1) -> 1, get(2) -> -1 (evicted)',
        explanation: 'Key 2 was evicted because 1 was accessed, making 2 least recently used.'
      }
    ],
    starterCode: {
      python: `# DKoder Placement Engine - Python 3.12
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)

lru = LRUCache(2)
lru.put(1, 100)
lru.put(2, 200)
print("Key 1:", lru.get(1)) # 100
lru.put(3, 300)             # evicts key 2
print("Key 2:", lru.get(2)) # -1
`,
      cpp: `// DKoder Placement Engine - C++ (GCC 14)
#include <iostream>
#include <unordered_map>
#include <list>
using namespace std;

class LRUCache {
    int cap;
    list<pair<int, int>> dll; // key, val
    unordered_map<int, list<pair<int, int>>::iterator> map;
public:
    LRUCache(int capacity) : cap(capacity) {}
    
    int get(int key) {
        if (map.find(key) == map.end()) return -1;
        dll.splice(dll.begin(), dll, map[key]);
        return map[key]->second;
    }
    
    void put(int key, int value) {
        if (map.find(key) != map.end()) {
            dll.splice(dll.begin(), dll, map[key]);
            map[key]->second = value;
            return;
        }
        if (dll.size() == cap) {
            int old = dll.back().first;
            dll.pop_back();
            map.erase(old);
        }
        dll.emplace_front(key, value);
        map[key] = dll.begin();
    }
};

int main() {
    LRUCache lru(2);
    lru.put(1, 10);
    lru.put(2, 20);
    cout << lru.get(1) << endl; // 10
    return 0;
}
`,
      java: `// DKoder Placement Engine - Java (OpenJDK 21)
import java.util.*;

public class LRUCache extends LinkedHashMap<Integer, Integer> {
    private final int capacity;

    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    public int get(int key) {
        return super.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        super.put(key, value);
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }

    public static void main(String[] args) {
        LRUCache c = new LRUCache(2);
        c.put(1, 100);
        c.put(2, 200);
        System.out.println("Get 1: " + c.get(1));
    }
}
`,
      javascript: `// DKoder Placement Engine - JavaScript (ES2024)
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }

  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
  }
}

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1
`
    },
    complexityAnalysis: {
      time: 'O(1) strictly for get and put',
      space: 'O(Capacity) memory footprint',
      optimalTechnique: 'Doubly linked list paired with hash directory'
    }
  }
];
