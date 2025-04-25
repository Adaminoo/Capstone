import { useState } from "react";

const updateUsername = (setState, newName) => {
    setState(prev => ({ ...prev, name: newName}))
}

export default updateUsername