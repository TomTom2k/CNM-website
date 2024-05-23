
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routing from './routes';
import PrivateRoute from './routes/PrivateRoute';
import DefaultLayout from './layout/DefaultLayout';
import useListenFriend from './hooks/useListenFriend';

import VoiceCallOne from './pages/CallPage/VoiceCallOne';
import VideoCallOne from './pages/CallPage/VideoCallOne';
import VoiceCallGroup from './pages/CallPage/VoiceCallGroup';
import VideoCallGroup from './pages/CallPage/VideoCallGroup';
import useListenCall from './hooks/useListenCall';

function App() {
	useListenFriend()
	useListenCall()
	return (
		<div className="App">
			<Router>
				<Routes>
					{routing.map((route, index) => {
						const Page = route.component;
						const Layout = route.layout ? DefaultLayout : Fragment;

						return route.requireAuth ? (
							<Route
								key={index}
								path={route.path}
								element={
									<PrivateRoute key={index}>
										<Layout>
											<Page />
										</Layout>
									</PrivateRoute>
								}
							/>
						) : (
							<Route
								key={index}
								path={route.path}
								element={
									<Layout>
										<Page />
									</Layout>
								}
							/>
						);
					})}
					<Route path="/voice-call-one/:callId" element={<VoiceCallOne />} />
					<Route path="/video-call-one/:callId" element={<VideoCallOne />} />
					<Route path="/voice-call-group/:callId" element={<VoiceCallGroup />} />
					<Route path="/video-call-group/:callId" element={<VideoCallGroup />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
