import { useState, useEffect } from "react";
import type { IUserProfile } from "@/types/auth";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: IUserProfile;
}

function getInitials(name?: string) {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export default function EditProfileModal({ isOpen, onClose, user }: EditProfileModalProps) {
    const queryClient = useQueryClient();
    const { mutateAsync: updateProfile } = useUpdateProfile();

    const [formData, setFormData] = useState({
        name: user.name || "",
        username: user.username || "",
        bio: user.bio || "",
        website: user.websiteUrl || "",
        github: user.githubUsername || "",
        linkedin: user.linkedinUsername || "",
        twitter: user.twitterUsername || "",
        instagram: user.instagramUsername || "",
        avatar: user.avatarUrl || "",
    });

    const [isSaving, setIsSaving] = useState(false);

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({
                ...prev,
                name: user.name || "",
                username: user.username || "",
                bio: user.bio || "",
                website: user.websiteUrl || "",
                github: user.githubUsername || "",
                linkedin: user.linkedinUsername || "",
                twitter: user.twitterUsername || "",
                instagram: user.instagramUsername || "",
                avatar: user.avatarUrl || "",
            }));
        }
    }, [isOpen, user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, avatar: url }));
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { avatar, ...submitData } = formData;

            // Clean up potentially full URLs to usernames
            const extractUsername = (val: string, type: 'github' | 'linkedin' | 'twitter' | 'instagram') => {
                if (!val) return "";
                val = val.trim();
                try {
                    const url = new URL(val);
                    const parts = url.pathname.split('/').filter(Boolean);
                    if (type === 'linkedin' && parts[0] === 'in') return parts[1] || val;
                    return parts[parts.length - 1] || val;
                } catch {
                    return val.replace(/^@/, '');
                }
            };

            await updateProfile({
                name: submitData.name,
                bio: submitData.bio,
                website: submitData.website,
                github: extractUsername(submitData.github, 'github'),
                linkedin: extractUsername(submitData.linkedin, 'linkedin'),
                twitter: extractUsername(submitData.twitter, 'twitter'),
                instagram: extractUsername(submitData.instagram, 'instagram')
            });
            await queryClient.invalidateQueries({ queryKey: ["profile"] });
            onClose();
        } catch (error) {
            console.error("Failed to update profile", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-4xl p-0 gap-0 overflow-hidden">
                <DialogHeader className="p-5 border-b border-border/50">
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription className="sr-only">Make changes to your profile here. Click save when you're done.</DialogDescription>
                </DialogHeader>

                <div className="p-6 overflow-y-auto max-h-[75vh]">
                    <form id="edit-profile-form" onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Left Column: Basic Details */}
                        <div className="space-y-5">

                            {/* Avatar Upload */}
                            <div className="flex flex-col items-center sm:items-start gap-4 pb-2">
                                <span className="text-sm font-semibold text-foreground">Profile Picture</span>
                                <div className="flex items-center gap-5 w-full">
                                    <Avatar className="h-20 w-20 ring-2 ring-border shadow-sm">
                                        <AvatarImage src={formData.avatar} className="object-cover" />
                                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                                            {getInitials(formData.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-2">
                                        <Label
                                            htmlFor="avatar-upload"
                                            className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                                        >
                                            Change Picture
                                        </Label>
                                        <Input
                                            id="avatar-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-sm font-semibold text-muted-foreground border-b pb-2 mb-2">Basic Details</h3>

                            <div className="space-y-2">
                                <Label htmlFor="name">Display Name</Label>
                                <Input
                                    id="name" name="name"
                                    value={formData.name} onChange={handleChange}
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username" name="username"
                                    value={formData.username} onChange={handleChange}
                                    placeholder="Username" disabled
                                />
                                <p className="text-xs text-muted-foreground">Username cannot be changed.</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <textarea
                                    id="bio" name="bio"
                                    value={formData.bio} onChange={handleChange}
                                    placeholder="A short bio about yourself..."
                                    className="w-full flex min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                />
                            </div>

                        </div>

                        {/* Right Column: Additional Details */}
                        <div className="space-y-5">
                            <h3 className="text-sm font-semibold text-muted-foreground border-b pb-2 mb-2">Additional Details</h3>

                            <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website" name="website"
                                    value={formData.website} onChange={handleChange}
                                    placeholder="https://your-portfolio.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="github">GitHub</Label>
                                <Input
                                    id="github" name="github"
                                    value={formData.github} onChange={handleChange}
                                    placeholder="GitHub Username"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="linkedin">LinkedIn</Label>
                                <Input
                                    id="linkedin" name="linkedin"
                                    value={formData.linkedin} onChange={handleChange}
                                    placeholder="LinkedIn Username"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="twitter">Twitter / X</Label>
                                <Input
                                    id="twitter" name="twitter"
                                    value={formData.twitter} onChange={handleChange}
                                    placeholder="Twitter Handle (e.g., @username)"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="instagram">Instagram</Label>
                                <Input
                                    id="instagram" name="instagram"
                                    value={formData.instagram} onChange={handleChange}
                                    placeholder="Instagram Username"
                                />
                            </div>

                            <div className="pt-4 mt-auto rounded-lg bg-muted/30 p-4 border border-border/40 hidden md:block">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Check size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">Keep your profile updated</h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">Profiles with complete details attract more views from the community.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <DialogFooter className="p-5 border-t border-border/50 bg-muted/20 sm:justify-end">
                    <Button variant="outline" type="button" onClick={onClose} disabled={isSaving}>
                        Cancel
                    </Button>
                    <Button type="submit" form="edit-profile-form" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                        {!isSaving && <Check size={16} className="ml-2" />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
