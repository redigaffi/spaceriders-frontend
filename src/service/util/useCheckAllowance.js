import SpaceRiders from "../contract/SpaceRiders";

export const useCheckAllowance = async (owner, spender, amount) => {
    let allowance = await SpaceRiders.allowance(owner, spender);
    return allowance >= amount;
};

