import { ErrorMessage, Field, Formik ,Form} from "formik";
import {
    RefreshCw,
    University,
    Wallet,
    Badge,
    ArrowLeftRight,
    Megaphone,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {useLocation, useParams } from "react-router-dom";
import * as Yup from "yup";


type UserDetailParams = {
    user_id: string; // jo aapne route me diya /user-detail/:id
};

type RowType = {
    username: string,
   address_verified: boolean;
  bio: string | null;
  city: string;
  country: string;
  country_code: string;
  country_flag_url: string;
  dialing_code: string;
  email: string;
  email_verified: boolean;
  id_verified: boolean;
  last_login: string;
  last_login_duration: string;
  last_seen_at: string;
  login_status: string;
  login_with: string;
  name: string | null;
  phone_number: string | null;
  phone_verified: boolean;
  preferred_currency: string | null;
  preferred_timezone: string;
  profile_image_url: string | null;
  twoFactorAuth: boolean;
  user_id: number;
  user_status: string;
  username_changed: boolean;
};
interface SummaryCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    backgroundColor: string;
    iconBackgroundColor: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
    title,
    value,
    icon,
    backgroundColor,
    iconBackgroundColor,
}) => {
    return (
        <div
            style={{
                display: "flex",
                backgroundColor,
                borderRadius: 6,
                overflow: "hidden",
                width: "100%", // full width inside grid cell
            }}
        >
            <div style={{ flex: 2, padding: "20px 15px", color: "#fff" }}>
                <div style={{ fontWeight: "bold", fontSize: 14 }}>{title}</div>
                <div style={{ fontWeight: "bold", fontSize: 24, marginTop: 8 }}>
                    {value}
                </div>
            </div>
            <div
                style={{
                    flex: 1,
                    backgroundColor: iconBackgroundColor,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {icon}
            </div>
        </div>
    );
};


interface CryptoCardProps {
    id:string,
    symbol: string;
    balance: number;
    usdValue: number;
    name: string;
    iconSrc: string;
}

const CryptoCard: React.FC<CryptoCardProps> = ({
    symbol,
    balance,
    usdValue,
    name,
    iconSrc,
}) => {
    return (
        <div
            style={{
                backgroundColor: "white",
                borderRadius: 6,
                padding: 16,
                boxShadow: "0 2px 12px rgb(0 0 0 / 0.1)",
                display: "flex",
                alignItems: "center",
                width: "100%",       // grid cell ka full width lega
                minHeight: 120,      // sab cards same height
            }}
        >
            <img
                src={iconSrc}
                alt={`${symbol} icon`}
                style={{
                    width: 65,
                    height: 65,
                    borderRadius: "50%",
                    marginRight: 16,
                }}
            />
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold", fontSize: 16 }}>{balance}</div>
                <div style={{ fontWeight: "bold", fontSize: 16 }}>({symbol})</div>
                <div style={{ fontSize: 14, color: "#555" }}>Total balance</div>
                <div style={{ fontSize: 14, color: "#555" }}>
                    USD Value:{" "}
                    <span style={{ color: "#3b3cff", fontWeight: "bold" }}>
                        ${usdValue.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};


interface UserDetailProps {
    username: string;
    summary: {
        advertisements: number;
        deposits: number;
        withdrawals: number;
        transactions: number;
    };
    cryptos: CryptoCardProps[];
}

const UserDetail: React.FC<UserDetailProps> = ({
    username,
    summary,
    cryptos,
}) => {

    const { user_id } = useParams<UserDetailParams>();
    const location = useLocation();
    const state = location.state as { data: RowType };

    const userDetail = state?.data;
   const initialValues = {
    firstName: userDetail?.username ?? "",
    lastName: "kumar", // Assuming you have last name separately
    email: userDetail?.email ?? "",
    phone_number: userDetail?.phone_number ?? "9999999999",
    address: "No9 bus stop nekede old road",
    city: userDetail?.city ?? "",
    state: "Imo",
    zip: "46001",
    country: userDetail?.country ?? "country",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone_number: Yup.string().required("Mobile number is required"),
    country: Yup.string().required("Country is required"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form data", values);
  };

  
    return (
        <div style={{ fontFamily: "Arial, sans-serif" }}>
            {/* Header */}
            <header className="flex flex-wrap items-center justify-between mb-6 gap-3">
                <h2 className="text-lg font-semibold text-gray-900">
                    User Detail – {userDetail?.username ?? ""}
                </h2>
                <button
                    className="border border-[#4b52ce] bg-white text-[#4b52ce] 
            px-4 py-1.5 rounded-md cursor-pointer 
            text-sm transition-colors duration-200 
            hover:bg-[#4b52ce] hover:text-white 
            w-full sm:w-auto text-center"
                >
                    ↻ Login as User
                </button>
            </header>

            {/* Summary Cards */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // equal width
                    gap: "24px",
                    marginBottom: 24,
                }}
            >
                <SummaryCard
                    title="Total Advertisements"
                    value={summary.advertisements}
                    backgroundColor="#2e378c"
                    iconBackgroundColor="#3c49b6"
                    icon={<Megaphone size={27} color="white" />}
                />
                <SummaryCard
                    title="Deposits"
                    value={summary.deposits}
                    backgroundColor="#1a7670"
                    iconBackgroundColor="#39c4bb"
                    icon={<Wallet size={27} color="white" />}
                />
                <SummaryCard
                    title="Withdrawals"
                    value={summary.withdrawals}
                    backgroundColor="#a45b10"
                    iconBackgroundColor="#fc8b2e"
                    icon={<University size={27} color="white" />}
                />
                <SummaryCard
                    title="Transactions"
                    value={summary.transactions}
                    backgroundColor="#004d81"
                    iconBackgroundColor="#03579a"
                    icon={<ArrowLeftRight size={27} color="white" />}
                />
            </div>


            {/* Crypto Cards Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // equal widths
                    gap: "16px",
                    width: "100%",
                    maxWidth: "1230px",
                }}
            >
               {cryptos.map((crypto) => (
  <CryptoCard key={crypto.id} {...crypto} />
))}

            </div>


            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
                <button className="flex-1 flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-md shadow">
                    <span className="text-lg font-bold">➕</span>
                    <span>Balance</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-md shadow">
                    <span className="text-lg font-bold">➖</span>
                    <span>Balance</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md shadow">
                    <span className="text-lg font-bold">≞</span>
                    <span>Logins</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-md shadow">
                    <span className="text-lg font-bold">🔔</span>
                    <span>Notifications</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 bg-orange-400 hover:bg-orange-500 text-white px-5 py-3 rounded-md shadow">
                    <span className="text-lg font-bold">🚫</span>
                    <span>Ban User</span>
                </button>
            </div>


            <div className=" mx-auto my-8 p-6 rounded-lg bg-white shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                    Information of {userDetail?.username ?? ""}
                </h2>

                <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, }) => (
        <Form>
          {/* First and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-1 text-gray-700" htmlFor="firstName">
                First Name <span className="text-red-600">*</span>
              </label>
              <Field
                type="text"
                id="firstName"
                name="firstName"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700" htmlFor="lastName">
                Last Name <span className="text-red-600">*</span>
              </label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          {/* Email and Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-1 text-gray-700" htmlFor="email">
                Email <span className="text-red-600">*</span>
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                readOnly
                className="w-full border border-gray-300 rounded-md py-2 px-3 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700" htmlFor="phone_number">
                Mobile Number <span className="text-red-600">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-200 text-gray-800 select-none">
                  +
                </span>
                <Field
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  className="flex-1 border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <ErrorMessage
                name="phone_number"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          {/* Address */}
          <div className="mb-6">
            <label className="block mb-1 text-gray-700" htmlFor="address">
              Address
            </label>
            <Field
              type="text"
              id="address"
              name="address"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* City, State, Zip/Postal, Country */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block mb-1 text-gray-700" htmlFor="city">
                City
              </label>
              <Field
                type="text"
                id="city"
                name="city"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700" htmlFor="state">
                State
              </label>
              <Field
                type="text"
                id="state"
                name="state"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700" htmlFor="zip">
                Zip/Postal
              </label>
              <Field
                type="text"
                id="zip"
                name="zip"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700" htmlFor="country">
                Country <span className="text-red-600">*</span>
              </label>
              <Field
                as="select"
                id="country"
                name="country"
                className="w-full border border-gray-300 rounded-md py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                {/* Add more countries */}
              </Field>
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <div>
                            <label className="block mb-2 text-gray-700">Email Verification</label>
                            <button
                                type="button"
                                className="w-full py-3 bg-green-500 text-white rounded-md relative"
                            >
                                Verified
                                <span className="absolute top-0 right-0 h-full w-2 bg-gradient-to-l from-green-700 to-green-500 rounded-tr-md rounded-br-md"></span>
                            </button>
                        </div>
                        <div>
                            <label className="block mb-2 text-gray-700">Mobile Verification</label>
                            <button
                                type="button"
                                className="w-full py-3 bg-green-500 text-white rounded-md relative"
                            >
                                Verified
                                <span className="absolute top-0 right-0 h-full w-2 bg-gradient-to-l from-green-700 to-green-500 rounded-tr-md rounded-br-md"></span>
                            </button>
                        </div>
                        <div>
                            <label className="block mb-2 text-gray-700">2FA Verification</label>
                            <button
                                type="button"
                                className="w-full py-3 bg-red-500 text-white rounded-md relative"
                            >
                                Disable
                                <span className="absolute top-0 right-0 h-full w-2 bg-gradient-to-l from-red-700 to-red-500 rounded-tr-md rounded-br-md"></span>
                            </button>
                        </div>
                        <div>
                            <label className="block mb-2 text-gray-700">KYC</label>
                            <button
                                type="button"
                                className="w-full py-3 bg-green-500 text-white rounded-md relative"
                            >
                                Verified
                                <span className="absolute top-0 right-0 h-full w-2 bg-gradient-to-l from-green-700 to-green-500 rounded-tr-md rounded-br-md"></span>
                            </button>
                        </div>
                    </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
            </div>

        </div>
    );
};

// Demo Component
const DemoUserDetail = () => {
    return (
        <UserDetail
            username="JohnDoe"
            summary={{
                advertisements: 12,
                deposits: 8,
                withdrawals: 3,
                transactions: 25,
            }}
            cryptos={[
                {
                    id:'1',
                    symbol: "BTC",
                    balance: 0.12345678,
                    usdValue: 3200,
                    name: "Bitcoin",
                    iconSrc:
                        "https://script.viserlab.com/localcoins/demo/assets/images/crypto/6409f6b9b8a961678374585.png",
                },
                {
                                        id:'2',

                   symbol: "ETH",
                    balance: 1.23456789,
                    usdValue: 2500,
                    name: "Ethereum",
                    iconSrc:
                        "https://script.viserlab.com/localcoins/demo/assets/images/crypto/632800688a1a51663565928.png",
                },
                {
                                        id:'3',

                    symbol: "ETH",
                    balance: 1.23456789,
                    usdValue: 2500,
                    name: "Ethereum",
                    iconSrc:
                        "https://script.viserlab.com/localcoins/demo/assets/images/crypto/632800688a1a51663565928.png",
                },
                {
                                        id:'4',

                    symbol: "ETH",
                    balance: 1.23456789,
                    usdValue: 2500,
                    name: "Ethereum",
                    iconSrc:
                        "https://script.viserlab.com/localcoins/demo/assets/images/crypto/632800688a1a51663565928.png",
                }, {
                                        id:'5',

                    symbol: "ETH",
                    balance: 1.23456789,
                    usdValue: 2500,
                    name: "Ethereum",
                    iconSrc:
                        "https://script.viserlab.com/localcoins/demo/assets/images/crypto/632800688a1a51663565928.png",
                }, {
                                        id:'6',

                    symbol: "ETH",
                    balance: 1.23456789,
                    usdValue: 2500,
                    name: "Ethereum",
                    iconSrc:
                        "https://script.viserlab.com/localcoins/demo/assets/images/crypto/632800688a1a51663565928.png",
                },
            ]}
        />
    );
};

export default DemoUserDetail;
