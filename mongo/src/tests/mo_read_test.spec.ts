import assert from 'assert';

import { Student } from '../schema/students';

describe('Read test', () => {
	let _id: string;

	const NAME = 'reader';

	beforeEach((done) => {
		const user = new Student({ name: NAME });

		user.save().then((data) => {
			_id = data._id.toString();
			done();
		});
	});

	it('read from students collection', (done) => {
		Student.findOne({ name: NAME }).then((student) => {
			const isFound = _id === student?._id.toString();

			assert(isFound);
			done();
		});
	});
});
