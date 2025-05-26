import wallet from "../assets/wallet.jpg";
import money from "../assets/money.png";

const Header = () => {
  return (
    <div className="container mx-auto p-4 flex justify-center gap-4 ">
      <div className="bg-white rounded-lg shadow-lg p-4 w-80">
        <img
          src={wallet}
          alt="Wallet"
          className="w-full h-48 object-cover rounded"
        />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 w-80">
        <img
          src={money}
          alt="Money"
          className="w-full h-48 object-cover rounded"
        />
      </div>
    </div>
  );
};

export default Header;
