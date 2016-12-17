#include <node.h>
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

class graph;

class vis_node
{
   protected:
      std::string display_id_ = "sample";
      // zero is a sentinel value for invalid id
      graph* graph_ptr = nullptr; // no ownership
      std::experimental::optional<size_t> row_id; // stores relative row in current graph;

      friend class graph;

   public:
      virtual void access_children (std::function<void(vis_node*)> access) = 0;

      void store (std::queue<vis_node*>& q)
      {
         access_children([&q](vis_node* child)
         {
            q.push(child);
         });
      }
};

class graph
{
   private:
      // stores relationship info
      std::unordered_map<vis_node*, std::vector<vis_node*> > parent2child;

      graph (vis_node* root)
      {
         // use a queue to perform breadth-wise search
         std::queue<vis_node*> q;
         q.push(root);
         root->store(q);

         // initialize root graph info
         root->row_id = 0;

         while (false == q.empty())
         {
            root = q.front();
            q.pop();
            // current root is unique in relationship map -> store
            if (nullptr == root->graph_ptr)
            {
               root->graph_ptr = this;
               root->access_children([root, this, &q](vis_node* child)
               {
                  parent2child[root].push_back(child);
                  child->store(q);
                  assert(root->row_id);
                  child->row_id = root->row_id.value() + 1;
               });
            }
            else // root intersects with another graph
            {

            }
         }
      }

   public:
      static graph* build (vis_node* root)
      {
         if (nullptr != root->graph_ptr) return nullptr;
         return new graph(root);
      }
};

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
