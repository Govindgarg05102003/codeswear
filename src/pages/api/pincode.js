export default function handler(req, res) {
	if (req.method === 'POST') {
		const userPincode = parseInt(req.body.pincode);
		const servicablePincodes = [324001, 1243214, 341232, 23412, 12341234];

		// If the pincode is servicable 'true' is returned.
		servicablePincodes.includes(userPincode) ? res.status(200).json(true) : res.status(200).json(false);
	} else {
		res.status(200).json([324001, 1243214, 341232, 23412, 12341234]);
	}
}
