import HomeLayout from "@/components/layout/home"

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <HomeLayout>{children}</HomeLayout>
}

export default RootLayout
