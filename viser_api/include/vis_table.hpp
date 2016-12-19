#include <vector>
#include <string>
#include <queue>
#include <functional>
#include <unordered_map>
#include <unordered_set>
#include <cassert>
#include <experimental/optional> // 2017

namespace nnet_viser
{

// DIAGNOSTIC ONLY
class vis_table
{
   private:
      std::unordered_set<graph*> disjoints;

   public:

      // populate table with all unique descendents of root
      // scenarios:
      // 1. root is already in the table graph
      // 2. root graph intersects 1 graph
      // 3. root graph intersects no graphs
      // 4. root graph intersects 2 or more disjoint graphs
};

} // namespace nnet_viser
