import MuiPaper from "@/components/paper/Paper";

const Home = () => {
  return (
    <div className="flex min-h-screen justify-between p-24 gap-8">
      <MuiPaper component={"nav"} className="flex-grow max-w-[240px] p-4" elevation={3} color="primary">
        Navbar
      </MuiPaper>
      <main className="flex flex-col flex-grow gap-4">
        <div className="flex flex-wrap gap-4">
          <MuiPaper className="flex-grow min-h-[180px] p-4" elevation={2} color="primary">
            Card 1
          </MuiPaper>
          <MuiPaper className="flex-grow min-h-[180px] p-4" elevation={2} color="primary">
            Card 1
          </MuiPaper>
          <MuiPaper className="flex-grow min-h-[180px] p-4" elevation={2} color="primary">
            Card 1
          </MuiPaper>
        </div>
        <div className="flex flex-wrap gap-4">
          <MuiPaper className="flex-grow-[2] min-h-[320px] p-4" elevation={2} color="primary">
            Graph 1
          </MuiPaper>
          <MuiPaper className="flex-grow min-h-[320px] p-4" elevation={2} color="primary">
            Graph 1
          </MuiPaper>
        </div>
        <div className="flex flex-wrap flex-grow gap-4">
          <MuiPaper className="flex-grow min-h-[240px] p-4" elevation={2} color="primary">
            Stats 1
          </MuiPaper>
          <MuiPaper className="flex-grow min-h-[240px] p-4" elevation={2} color="primary">
            Stats 1
          </MuiPaper>
          <MuiPaper className="flex-grow min-h-[240px] p-4" elevation={2} color="primary">
            Stats 1
          </MuiPaper>
        </div>
      </main>
    </div>
  );
};

export default Home;
