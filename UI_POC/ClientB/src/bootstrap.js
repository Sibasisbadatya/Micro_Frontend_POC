import React from "react";
import ReactDOM from "react-dom/client";
import clientConfig from "./clientConfig";
// Instead of directly importing
const DynamicShippingAddressForm = React.lazy(() =>
  import("product/DynamicShippingAddressForm").catch(() => ({
    default: () => <div>Shipping form unavailable</div>,
  }))
);

const App = () => (
	<React.Suspense fallback={<div>Loading...</div>}>
		<DynamicShippingAddressForm
			schema={clientConfig}
			initialValues={{}}
			onSave={data => {
				alert("Saved: " + JSON.stringify(data, null, 2));
			}}
		/>
	</React.Suspense>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);