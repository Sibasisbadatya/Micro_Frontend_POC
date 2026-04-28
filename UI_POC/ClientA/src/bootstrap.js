import React, { lazy, Suspense } from 'react';
import ReactDOM from "react-dom/client";
import clientConfig from "./clientConfig";

// Instead of directly importing
const DynamicShippingAddressForm = lazy(() => 
    import('product/DynamicShippingAddressForm')
)

console.log("DynamicShippingAddressForm",DynamicShippingAddressForm);


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