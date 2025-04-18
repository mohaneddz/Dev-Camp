import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Post {
  id: string;
  status: 'draft' | 'posted' | 'scheduled';
  title: string;
  likes: number;
}

const instagramPosts: Post[] = [
  {
    id: '1',
    status: 'posted',
    title: 'Instagram Story: our new product',
    likes: 250000,
  },
  {
    id: '2',
    status: 'draft',
    title: 'New Feature Launch Announcement',
    likes: 0,
  },
  {
    id: '3',
    status: 'scheduled',
    title: 'Behind the Scenes: Team Meeting',
    likes: 0,
  },
  {
    id: '4',
    status: 'posted',
    title: 'Customer Success Story: ABC Corp',
    likes: 125000,
  },
  {
    id: '5',
    status: 'posted',
    title: 'Product Update: Version 2.0',
    likes: 180000,
  },
];

const facebookPosts: Post[] = [
  {
    id: '1',
    status: 'posted',
    title: 'Company Culture Spotlight',
    likes: 320000,
  },
  {
    id: '2',
    status: 'scheduled',
    title: 'Upcoming Webinar: Digital Transformation',
    likes: 0,
  },
  {
    id: '3',
    status: 'posted',
    title: 'Customer Testimonial Video',
    likes: 450000,
  },
  {
    id: '4',
    status: 'draft',
    title: 'Product Launch Event Live Stream',
    likes: 0,
  },
  {
    id: '5',
    status: 'posted',
    title: 'Industry Insights: Market Trends 2024',
    likes: 275000,
  }
];

const activityData = [
  { month: 'Jan', posts: 15, likes: 280000 },
  { month: 'Feb', posts: 12, likes: 320000 },
  { month: 'Mar', posts: 18, likes: 450000 },
  { month: 'Apr', posts: 20, likes: 380000 },
  { month: 'May', posts: 16, likes: 410000 },
  { month: 'Jun', posts: 22, likes: 520000 },
];

const fbActivityData = [
  { month: 'Jan', posts: 8, likes: 150000 },
  { month: 'Feb', posts: 10, likes: 180000 },
  { month: 'Mar', posts: 12, likes: 220000 },
  { month: 'Apr', posts: 15, likes: 250000 },
  { month: 'May', posts: 11, likes: 190000 },
  { month: 'Jun', posts: 14, likes: 280000 },
];

export default function Posts() {
  return (
    <div className="flex flex-1 flex-col w-full h-full">
      <div className="p-8 space-y-12 overflow-y-auto" style={{ height: 'calc(100vh - 100px)' }}>
        <div>
          <div className="text-2xl font-bold mb-6">Instagram</div>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 mb-8">
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={activityData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="likes"
                    stroke="#8884d8"
                    name="Likes"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="posts"
                    stroke="#82ca9d"
                    name="Posts"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px] sm:w-[100px]">Status</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="text-right">Likes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {instagramPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                          ${post.status === 'posted' ? 'bg-green-50 text-green-700' : 
                            post.status === 'draft' ? 'bg-gray-50 text-gray-700' : 
                            'bg-blue-50 text-blue-700'}`
                        }>
                          {post.status}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[150px] sm:max-w-none truncate">{post.title}</TableCell>
                      <TableCell className="text-right">
                        {post.likes.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <div>
          <div className="text-2xl font-bold mb-6">Facebook</div>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 mb-8">
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={fbActivityData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="likes"
                    stroke="#8884d8"
                    name="Likes"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="posts"
                    stroke="#82ca9d"
                    name="Posts"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px] sm:w-[100px]">Status</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="text-right">Likes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facebookPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                          ${post.status === 'posted' ? 'bg-green-50 text-green-700' : 
                            post.status === 'draft' ? 'bg-gray-50 text-gray-700' : 
                            'bg-blue-50 text-blue-700'}`
                        }>
                          {post.status}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[150px] sm:max-w-none truncate">{post.title}</TableCell>
                      <TableCell className="text-right">
                        {post.likes.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
